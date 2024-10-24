import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:frontend-challenge-picpay/src/app/components/dashboard/task-filter/task-filter.component.spec.ts
import { TaskFilterComponent } from './task-filter.component';

describe('TaskFilterComponent', () => {
  let component: TaskFilterComponent;
  let fixture: ComponentFixture<TaskFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFilterComponent ]
========
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutComponent ]
>>>>>>>> 6ab0873c01941cec38fefb496c9a35db0b9d23de:frontend-challenge-picpay/src/app/components/layout/layout.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<<< HEAD:frontend-challenge-picpay/src/app/components/dashboard/task-filter/task-filter.component.spec.ts
    fixture = TestBed.createComponent(TaskFilterComponent);
========
    fixture = TestBed.createComponent(LayoutComponent);
>>>>>>>> 6ab0873c01941cec38fefb496c9a35db0b9d23de:frontend-challenge-picpay/src/app/components/layout/layout.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
