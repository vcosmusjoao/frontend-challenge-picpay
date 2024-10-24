
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
import { PaidUnpaidPipe } from './components/shared/pipes/paid-unpaid.pipe';
import { TaskFormComponent } from './components/dashboard/task-form/task-form.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Adicione isso
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { TaskFilterComponent } from './components/dashboard/task-filter/task-filter.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ToolbarModule} from 'primeng/toolbar';
import {PasswordModule} from 'primeng/password';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TaskListComponent,
    PaidUnpaidPipe,
    TaskFormComponent,
    TaskFilterComponent,
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
    RadioButtonModule,
    ToolbarModule,
    PasswordModule
  ],
  providers: [
    {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TaskFormComponent),
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
