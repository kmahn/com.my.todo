import { Injectable } from '@angular/core';

export enum StorageKeys {
  ACCESS_TOKEN = 'td-access-token',
  REFRESH_TOKEN = 'td-refresh-token'
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor() {
  }

  get<R>(key: StorageKeys): R | null {
    const json = sessionStorage.getItem(key) || localStorage.getItem(key);
    if (json) {
      return JSON.parse(json);
    }
    return null;
  }

  set<T>(key: StorageKeys, value: T, useLocal = false): void {
    const storage: Storage = useLocal ? localStorage : sessionStorage;
    storage.setItem(key, JSON.stringify(value));
  }

  remove<R>(key: StorageKeys): R | null {
    const value: R | null = this.get<R>(key);

    sessionStorage.removeItem(key);
    localStorage.removeItem(key);

    return value;
  }

  clear(): void {
    sessionStorage.clear();
    localStorage.clear();
  }
}
