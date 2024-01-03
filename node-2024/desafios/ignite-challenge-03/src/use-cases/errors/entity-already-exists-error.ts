export class EntityAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
