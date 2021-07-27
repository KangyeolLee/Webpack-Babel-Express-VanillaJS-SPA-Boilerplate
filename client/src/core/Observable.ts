/* any는 나중에 꼭꼮꼭 타입을 바꿔주도록 해보아요 */
import { Duplicates, Store } from '@/Core/Store';

export default class Observable {
  private _observers: any;
  private _duplicate: any;

  constructor() {
    this._observers = Store.getStates;
    this._duplicate = Duplicates.getStates;
  }

  subscribe(key: string, observer_name: string, observer: any) {
    if (!this._observers[key]) {
      this._observers[key] = [];
    }

    if (this._duplicate.has(observer_name)) {
      this.unsubscribe(key, observer);
    }

    this._duplicate.add(observer_name);
    this._observers[key].push(observer);
  }

  unsubscribe(key: string, observer: any) {
    if (!this._observers[key]) return;
    this._observers[key] = [...this._observers[key]].filter(
      (subscriber) => subscriber !== observer
    );
  }

  notify(key: string, data: any) {
    this._observers[key].forEach((observer: any) => observer.setState(data));
  }
}
