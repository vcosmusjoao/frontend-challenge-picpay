import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
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
    return this.http.get(this.apiUrl,{params });
  }

  addTask(task: Task): Observable<any> {
    return this.getLastId().pipe(
      switchMap(lastId => {
        const newId = lastId + 1;
        const newTask = { ...task, id: newId.toString() };
        return this.http.post(this.apiUrl, newTask);
      }),
      catchError(err => {
        return of(null); 
      })
    );
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put(`${this.apiUrl}/${task.id}`, task);
  }
  
  getLastId():Observable<number> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      map(tasks=>{
        const ids = tasks.map(task=> parseInt(task.id,10));
        return Math.max(...ids,0);
      }),
      catchError(()=>of(0))
    );
  }



}

