import { describe, expect, it, vi } from 'vitest'
import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate // eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggregate
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and listen domain events', () => {
    const callbackSpy = vi.fn()

    // Subscriber Cadastrado (ouvindo um evento)
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Estou criando uma repsosta porem sem salvar no banco
    const aggregate = CustomAggregate.create()

    // Estou assegurando q o evento foi criado porem nao disparado
    expect(aggregate.domainEvents).toHaveLength(1)

    // Salvei no banco e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // O subscriber escuta o eventon e faz o q precisa ser feito
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
