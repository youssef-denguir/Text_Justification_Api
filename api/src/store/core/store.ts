import { IStore } from "./interfaces/store.interface";
export class Store<T, V> implements IStore<T, V>{
  private readonly _mapper: Map<T, V>;

  constructor() {
    this._mapper = new Map<T, V>();
  }

  get(key: T): V {
    return this._mapper.get(key);
  }

  set(key: T, value: V): void {
    this._mapper.set(key, value);
  }
}
