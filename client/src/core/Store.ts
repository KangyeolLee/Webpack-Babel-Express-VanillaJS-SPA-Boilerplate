class StoreInitializer {
  private _states: {
    [key: string]: Array<any>;
  };

  constructor() {
    this._states = {};
  }

  get getStates() {
    return this._states;
  }

  set setStates({ key, value }: { key: string; value: any }) {
    this._states[key].push(value);
  }
}

class DuplicatesInitializer {
  private _duplicates: any;

  constructor() {
    this._duplicates = new Set();
  }

  get getStates() {
    return this._duplicates;
  }
}

export const Store = new StoreInitializer();
export const Duplicates = new DuplicatesInitializer();
