import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Todo } from '@td/common/types';
import { Observable } from 'rxjs';
import { APP_CONFIG, AppConfig } from '../providers/config.provider';
import { StorageKeys, StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  readonly BASE_URL: string;

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    @Inject(APP_CONFIG) appConfig: AppConfig,
  ) {
    this.BASE_URL = appConfig.apiHost;
  }


  findAll(): Observable<Todo[]> {
    const accessToken: string = this.storage.get(StorageKeys.ACCESS_TOKEN) as string;
    return this.http.get(`${this.BASE_URL}/todo`, { headers: { 'Authorization': `Bearer ${accessToken}` } }) as Observable<Todo[]>;
  }
}
