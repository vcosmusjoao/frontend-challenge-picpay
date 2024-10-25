import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Account } from '../models/account';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3030/account';
  
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?email=${email}`).pipe(
      map((users) => {
        const user = users.find((u: any) => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('loggedUser', JSON.stringify(user)); 
          return true;
        }
        return false;
      })
    );
  }

  logout() {
    localStorage.removeItem('loggedUser'); 
    this.router.navigate(['/login']);
  }

  
  getAccounts(filters?: { name?: string}): Observable<any> {
    const params = new HttpParams()
    .set('name',filters?.name || '')
    return this.http.get(this.apiUrl,{params });
  }

  addAccount(account: any): Observable<any> {
    return this.getLastId().pipe(
      switchMap(lastId => {
        const newId = lastId + 1;
        const newAccount = { ...account, id: newId.toString() };
        return this.http.post(this.apiUrl, newAccount);
      }),
      catchError(err => {
        return of(null); 
      })
    );
  }


  deleteAccount(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateAccount(account: Account): Observable<any> {
    return this.http.put(`${this.apiUrl}/${account.id}`, account);
  }

  getLastId():Observable<number> {
    return this.http.get<Account[]>(this.apiUrl).pipe(
      map(accounts=>{
        const ids = accounts.map(account=> parseInt(account.id,10));
        return Math.max(...ids,0);
      }),
      catchError(()=>of(0))
    );
  }
  
}
