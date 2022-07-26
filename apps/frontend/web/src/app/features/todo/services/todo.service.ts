import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { OrderedItem, Todo } from '@td/common/types';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { APP_CONFIG, AppConfig } from '../../../providers/config.provider';

@Injectable()
export class TodoService {

  readonly BASE_URL: string;
  todos$: Observable<Todo[]>;

  private _todoSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) appConfig: AppConfig,
  ) {
    this.todos$ = this._todoSubject.asObservable();
    this.BASE_URL = `${appConfig.apiHost}/todo`;
    this._init();
  }

  get todos(): Todo[] {
    return this._todoSubject.value;
  }

  create(todo: Partial<Todo>): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL}`, todo)
      .pipe(
        switchMap(() => this._findMyTodos()),
        map(() => undefined)
      );
  }

  updateOne(id: string, todo: Partial<Todo>): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/${id}`, todo)
      .pipe(
        switchMap(() => this._findMyTodos()),
        map(() => undefined)
      );
  }

  updateOrder(todos: Todo[]) {
    const orderedList: OrderedItem[] = todos.map(
      (todo, idx) => ({ _id: todo._id, order: idx + 1 })
    );
    return this.http.patch(`${this.BASE_URL}/order`, orderedList)
      .pipe(
        tap(() => this._todoSubject.next(todos))
      );
  }

  removeOne(id: string): Observable<void> {
    const index = this.todos.findIndex(todo => todo._id === id);
    if (index === -1) {
      return of(undefined);
    }
    return this.http.delete<void>(`${this.BASE_URL}/${id}`)
      .pipe(
        tap(() =>
          this._todoSubject.next([
            ...this.todos.slice(0, index),
            ...this.todos.slice(index + 1)]
          )
        )
      )
  }

  private _init() {
    this._findMyTodos().subscribe();
  }

  private _findMyTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.BASE_URL}/me`)
      .pipe(
        tap(todos => this._todoSubject.next(todos))
      );
  }
}
