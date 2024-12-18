import { NgModule, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {TaskListComponent } from './components/dashboard/task-list/task-list.component';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
//import { PaidUnpaidPipe } from './components/shared/pipes/paid-unpaid.pipe';
import { TaskFormComponent } from './components/dashboard/task-form/task-form.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Adicione isso
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { UserFilterComponent } from './components/dashboard/user-filter/user-filter.component';
import {ToolbarModule} from 'primeng/toolbar';
import {PasswordModule} from 'primeng/password';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserListComponent } from './components/dashboard/user-list/user-list.component';
import { UserFormComponent } from './components/dashboard/user-form/user-form.component';
import { LayoutComponent } from './components/layout/layout.component';
import {MenuModule} from 'primeng/menu';
import { PaidUnpaidPipe } from './components/shared/pipe/paid-unpaid.pipe';
import {InputMaskModule} from 'primeng/inputmask';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TaskListComponent,
    TaskFormComponent,
    UserFilterComponent,
    NavbarComponent,
    UserListComponent,
    UserFormComponent,
    LayoutComponent,
    PaidUnpaidPipe,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    AppRoutingModule,
    FormsModule,
    TableModule,
    AccordionModule,
    BrowserAnimationsModule,
    ToolbarModule,
    PasswordModule,
    SelectButtonModule,
    ToastModule,
    ProgressSpinnerModule,
    MenuModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    DialogModule,
    SelectButtonModule,
    InputMaskModule
  ],
  providers: [
    {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TaskFormComponent),
    multi: true
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
