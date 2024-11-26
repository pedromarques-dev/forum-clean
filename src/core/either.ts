// Error
export class Left<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return false
  }

  isLeft(): this is Left<L, R> {
    return true
  }

  get reason() {
    return this.value
  }
}

// Success
export class Right<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return true
  }

  isLeft(): this is Left<L, R> {
    return false
  }

  get result() {
    return this.value
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>

export const left = <L, R>(reason: L): Either<L, R> => {
  return new Left(reason)
}

export const right = <L, R>(result: R): Either<L, R> => {
  return new Right(result)
}
