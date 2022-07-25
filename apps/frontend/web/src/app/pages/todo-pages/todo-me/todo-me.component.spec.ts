import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoMeComponent } from './todo-me.component';

describe('MeComponent', () => {
  let component: TodoMeComponent;
  let fixture: ComponentFixture<TodoMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoMeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
