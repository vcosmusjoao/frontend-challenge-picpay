import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from 'src/app/services/task.service';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { Task } from 'src/app/models/task';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let messageService: jasmine.SpyObj<MessageService>;

  const mockTasks: Task[] = [
    {id: "1", 
    name: 'Task 1', 
    title: 'Title 1', 
    value: 300, 
    date: new Date().toString(),
    username:'Task 1', 
    image:"", 
    isPayed: false },

    {id: "2", 
    name: 'Task 2', 
    title: 'Title 2', 
    value: 300, 
    date: new Date().toString(),
    username:'Task 2', 
    image:"", 
    isPayed: false },
    {id: "3", 
    name: 'Task 3', 
    title: 'Title 3', 
    value: 300, 
    date: new Date().toString(),
    username:'Task 3', 
    image:"", 
    isPayed: false },
    
  ];

  beforeEach(() => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTasks', 'deleteTask']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    taskService.getTasks.and.returnValue(of(mockTasks));

    component.ngOnInit();

    expect(taskService.getTasks).toHaveBeenCalled();
    expect(component.tasks).toEqual(mockTasks);
    expect(component.filteredTasks).toEqual(mockTasks);
  });

  it('should show toast on error loading tasks', () => {
    taskService.getTasks.and.returnValue(throwError('Error'));

    component.loadTasks();

    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao carregar tarefas! Tente mais tarde!',
      life: 2000
    });
  });

  it('should open dialog for editing a task', () => {
    component.openDialog(mockTasks[0]);

    expect(component.editedTask).toEqual(mockTasks[0]);
    expect(component.tittleModal).toEqual('Editar Task');
    expect(component.visible).toBeTrue();
  });

  it('should add new task to the list', () => {
    const newTask: Task = 
    { 
      id: "3", 
      name: 'Task 3', 
      title: 'Title 3', 
      value: 300, 
      date: new Date().toString(),
      username:'Task 3', 
      image:"", 
      isPayed: false 
    };
    
    component.addTask(newTask);

    expect(component.tasks).toContain(newTask);
    expect(component.visible).toBeFalse();
  });

  it('should delete task and show toast', () => {
    taskService.deleteTask.and.returnValue(of({}));
    component.tasks = mockTasks;

    component.deleteTask(mockTasks[0]);

    expect(taskService.deleteTask).toHaveBeenCalledWith(mockTasks[0].id);
    expect(component.tasks.length).toBe(1);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Task deletada com sucesso!',
      life: 2000
    });
  });

});
