import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3030/tasks';
  constructor(private http: HttpClient) {}

  getTasks(filters?: { name?: string, isPayed?: boolean }): Observable<any> {
    const params = new HttpParams()
    .set('name',filters?.name || '')
    .set('isPayed', filters?.isPayed !== undefined ? filters.isPayed.toString() : '');
    return this.http.get(this.apiUrl,{params });
  }


  addTask(task: any, tasksLength:number): Observable<any> {
    const newId = tasksLength+1;
    const newTask = { ...task, id: newId.toString() };
    return this.http.post(this.apiUrl, newTask);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put(`${this.apiUrl}/${task.id}`, task);
  }
  

}

