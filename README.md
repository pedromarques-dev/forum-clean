# DDD (Domain-drive Design)

Design dirigido à domínio

## Domínio

- Domain Experts
  - Conversa
- Linguagem ubíqua

- Usuário
  - Client
  - Fornecedor
  - Atendente
  - Barman

- Agregados
- Value Objects
- Eventos de domínio
- Subdomínios (Bounded Contexts)
- Entidades
- Casos de uso



## Conceitos

- Aggregate
- WatchedList

## Exemplo

- Order -> OrderItem[]
- Order -> Shipping

- Question -> Attachment[]


### Criaçao

- Titulo
- Conteúdo
- Anexos (3)

### Edição

- Titulo
- Conteúdo

- Adicionar novo anexo (create)
- Remover o segundo anexo que tinha sido criado previamente (delete)
- Editar um anexo existente (update)


## Subdomínios

- Core: O que dá dinheiro
- Supporting: Dá suporte para o core funcionar
- Generic: Você precisa, mas nao sao tao importantes

> Exemplos

### Core
- Compra
- Catalogo
- Pagamento
- Entrega

### Supporting
- Estoque

### Generic
- Notificação ao cliente
- Promoções
- Chat
