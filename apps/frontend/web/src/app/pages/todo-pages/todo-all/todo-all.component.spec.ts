import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAllComponent } from './todo-all.component';

describe('AllComponent', () => {
  let component: TodoAllComponent;
  let fixture: ComponentFixture<TodoAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoAllComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
