import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { Account } from 'src/app/models/account';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges  {

  task: Task;
  @Input() listLength: number;
  @Input() userToEdit?: Account | null = null;
  @Input() titleModal: string;


  onChange: any;
  onTouched: any;
  _filled = new BehaviorSubject<boolean>(false);
  disabled: boolean;

  @Output() valueChanged = new EventEmitter();
  @Output() userCreated = new EventEmitter<void>();
  @Output() userUpdated = new EventEmitter<void>(); 
  
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  form!: FormGroup;
  isEdit: boolean=false;
  paymentOptions: any[];
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private service: AuthService,
    private messageService: MessageService) { 

    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['userToEdit'] && changes['userToEdit'].currentValue) {
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
  
    togglePasswordVisibility(): void {
      this.showPassword = !this.showPassword;
    }

  private filtroForm(){
    this.form = this.formBuilder.group({
      id: [this.userToEdit ? this.userToEdit.id : null],
      name: [this.userToEdit? this.userToEdit.name: '', Validators.required],
      email: [this.userToEdit? this.userToEdit.email: '', Validators.email],
      password: [this.userToEdit? this.userToEdit.password: '', Validators.required],
    });
   
  }

  getObject():Account{
    return this.form.getRawValue() as Account;
  }

  createOrUpdateAccount() {
    const user = this.getObject();
    if(this.form.valid){
      if (this.isEdit && user.id) {
        this.updateUser(user); 
      } else {
        this.createUser(user); 
      }
    }else{
      this.showToast('error', 'Erro', 'Formulario Inválido');
    }
  }


   createUser(user: Account) {
    this.service.addAccount(user).subscribe(
      () => {
        this.showToast('success', 'Sucesso', 'Usuário adicionado com sucesso!');
        this.userCreated.emit(); 
        this.close();
      },
      (error) => {
        this.close();
      }
    );
  }

  updateUser(user: Account) {
    this.service.updateAccount(user).subscribe(
      () => {
        this.showToast('success', 'Sucesso', 'Usuario atualizado com sucesso!');
        this.userUpdated.emit(); 
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
