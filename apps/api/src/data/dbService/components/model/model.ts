export class Model<T> {
  public create(data: Omit<T, 'created' | '$id'>, $id: string): T & { created: Date; $id: string } {
    return { ...data, created: new Date(), $id } as T & { created: Date; $id: string }
  }
  public update(data: T): T {
    return { ...data, updated: new Date() }
  }
}
