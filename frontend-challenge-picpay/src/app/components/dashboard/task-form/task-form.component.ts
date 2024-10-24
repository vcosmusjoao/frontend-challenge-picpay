import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnChanges  {

  task: Task;
  @Input() listLength: number;
  @Input() taskToEdit?: Task | null = null;
  @Input() titleModal: string;


  onChange: any;
  onTouched: any;
  _filled = new BehaviorSubject<boolean>(false);
  disabled: boolean;

  @Output() valueChanged = new EventEmitter();
  @Output() taskCreated = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<void>(); 
  
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  form!: FormGroup;
  isEdit: boolean=false;
  paymentOptions: any[];

  constructor(
    private formBuilder: FormBuilder, 
    private service: TaskService,
    private messageService: MessageService) { 
      
      this.paymentOptions = [{label: 'Unpaid', value: false}, {label: 'Paid', value: true}];

    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['taskToEdit'] && changes['taskToEdit'].currentValue) {
        this.isEdit = true; 
        this.filtroForm(); 
      } else {
        this.isEdit = false; 
        this.limparForm(); 
      }
    }

    ngOnInit(): void {
      this.filtroForm();
    }
  


  private filtroForm(){
    this.form = this.formBuilder.group({
      id: [this.taskToEdit ? this.taskToEdit.id : null],
      name: [this.taskToEdit? this.taskToEdit.name: '', Validators.required],
      username: [this.taskToEdit? this.taskToEdit.username: '', Validators.required],
      title: [this.taskToEdit? this.taskToEdit.title: '', Validators.required],
      value: [this.taskToEdit? this.taskToEdit.value: '', Validators.required],
      date: [this.taskToEdit? this.taskToEdit.date: ''],
      image: [this.taskToEdit? this.taskToEdit.image: ''],
      isPayed: [this.taskToEdit? this.taskToEdit.isPayed: false]
    });
   
  }

  getObject():Task{
    return this.form.getRawValue() as Task;
  }

  createOrUpdateTask() {
    const task = this.getObject();

    if(this.form.valid){
      if (this.isEdit && task.id) {
        this.updateTask(task); 
      } else {
        this.createTask(task); 
      }
    }else{
      this.showToast('error', 'Erro', 'Formulario Inválido');
    }
   
  }

   createTask(task: Task) {
    this.service.addTask(task).subscribe(
      () => {
        this.showToast('success', 'Sucesso', 'Tarefa adicionada com sucesso!');
        this.taskCreated.emit(); 
        this.close();
      },
      (error) => {
        this.close();
      }
    );
  }

  updateTask(task: Task) {
    this.service.updateTask(task).subscribe(
      () => {
        this.showToast('success', 'Sucesso', 'Tarefa atualizada com sucesso!');
        this.taskUpdated.emit(); 
        this.close();
      },
      (error) => {
        this.close();
      }
    );
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail,life: 2000 });
  }

  limparForm(){
    if (this.form) {
      this.form.reset();
    }
    this.isEdit = false; 
  }

  close() {
    this.visible = false; 
    this.visibleChange.emit(this.visible); 
    this.limparForm();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  change(v) {
    this._filled.next(!!v);
    this.onChange(v);
    this.valueChanged.emit(v);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue(obj: any) {
    if (obj) {
      this.form.setValue(obj); 
    }
  }
}
