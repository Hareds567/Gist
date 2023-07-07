export class Map<T, K> {
  map = new Array<[T, K]>();
  constructor(array?: [T, K][]) {
    if (array) this.map = array;
  }

  set(key: T, value: K) {
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i][0] === key) {
        this.map[i][1] === value;
        return;
      }
    }
    this.map.push([key, value]);
  }
  get(key: T) {
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i][0] === key) {
        return this.map[i][1];
      }
    }
    return undefined;
  }
}

