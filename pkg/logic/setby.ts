export default class SetBy<
  T extends Record<keyof T, T[keyof T]>
> extends Set<T> {
  find(cb: (item: T) => boolean) {
    for (const item of this) {
      if (cb(item)) {
        return item;
      }
    }
    return undefined;
  }
  findBy(value: string, key = "id" as keyof T) {
    return this.find(({ [key]: v }) => v === value);
  }
  deleteBy(id: string, key = "id" as keyof T) {
    const self = this.findBy(id, key);
    if (self) return this.delete(self);
    return false;
  }
  get last(): T {
    let item;
    for (item of this);
    return item;
  }
  set(item: T, key = "id" as keyof T) {
    if (this.deleteBy(item[key], key)) {
      this.set(item, key);
    } else this.add(item);
  }
}
