interface Storage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
  }
  
  export default class LocalStorage<T> {
    static instance: LocalStorage<any>;
    protected readonly storage: Storage | undefined;
  
    constructor() {
      if (LocalStorage.instance) {
        return LocalStorage.instance;
      }
      LocalStorage.instance = this;
      if (typeof window !== 'undefined') {
        this.storage = window.localStorage;
      }
    }
  
    protected get(key: string, defaultValue?: T): T | undefined {
      if (!this.storage) {
        return;
      }
  
      try {
        const value = this.storage.getItem(key);
        if (!value) {
          if (defaultValue === undefined) {
            console.log('storage item has not value and is not defined default value.');
          }
          return defaultValue;
        }
        return JSON.parse(value);
      } catch (e) {
        console.log('error occurs in storage get.');
      }
    }
  
    protected set(key: string, value: T): void {
      if (!this.storage) {
        return;
      }
      try {
        this.storage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.log('error occurs in storage set.');
      }
    }
  
    protected clear(key: string): void {
      if (!this.storage) {
        return;
      }
      this.storage.removeItem(key);
    }
  }
  