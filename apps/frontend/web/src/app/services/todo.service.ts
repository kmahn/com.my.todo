import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Todo } from '@td/common/types';
import { Observable, of } from 'rxjs';
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
    const accessToken: string = this.getAccessToken();
    return this.http.get(`${this.BASE_URL}/todo`, { headers: { 'Authorization': `Bearer ${accessToken}` } }) as Observable<Todo[]>;
  }

  findMe(): Observable<Todo[]> {
    const accessToken: string = this.getAccessToken();
    return this.http.get(`${this.BASE_URL}/todo/me`, { headers: { 'Authorization': `Bearer ${accessToken}` } }) as Observable<Todo[]>;
  }

  updateOne(editTodo: Todo): Observable<void> {
    const accessToken: string = this.getAccessToken();
    this.http.post(
      `${this.BASE_URL}/todo/${editTodo._id}`,
      {
        title: editTodo.title,
        done: editTodo.done,
      },
      {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      },
    ).subscribe();
    return of(undefined);
  }

  deleteOne(todo: Todo): Observable<void> {
    const accessToken: string = this.getAccessToken();
    this.http.delete(`${this.BASE_URL}/todo/${todo._id}`, { headers: { 'Authorization': `Bearer ${accessToken}` } }).subscribe();
    return of(undefined);
  }

  private getAccessToken(): string {
    return this.storage.get(StorageKeys.ACCESS_TOKEN) as string;
  }

  create(title: string): Observable<void> {
    const accessToken: string = this.getAccessToken();
    this.http.post(`${this.BASE_URL}/todo`, { title }, { headers: { 'Authorization': `Bearer ${accessToken}` } }).subscribe();
    return of(undefined);
  }
}
