export abstract class BaseCrudService<TEntity> {
  abstract getById(id: number): Promise<TEntity>;
  abstract create(entity: TEntity): Promise<TEntity>;
  abstract update(id: number, update: TEntity): Promise<boolean>;
  abstract delete(id: number): Promise<boolean>;
}
