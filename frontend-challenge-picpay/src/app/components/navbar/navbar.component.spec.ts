import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:frontend-challenge-picpay/src/app/components/dashboard/task-list/task-list.component.spec.ts
import { TaskListComponent } from './task-list.component';

describe('PaymentListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListComponent ]
========
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
>>>>>>>> 6ab0873c01941cec38fefb496c9a35db0b9d23de:frontend-challenge-picpay/src/app/components/navbar/navbar.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<<< HEAD:frontend-challenge-picpay/src/app/components/dashboard/task-list/task-list.component.spec.ts
    fixture = TestBed.createComponent(TaskListComponent);
========
    fixture = TestBed.createComponent(NavbarComponent);
>>>>>>>> 6ab0873c01941cec38fefb496c9a35db0b9d23de:frontend-challenge-picpay/src/app/components/navbar/navbar.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
