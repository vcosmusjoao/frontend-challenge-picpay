import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:3030/tasks';
  constructor(private http: HttpClient) {}

  getPayments():Observable<any>{
    return this.http.get(this.apiUrl);
  }
  addPayment(payment: any): Observable<any> {
    return this.http.post(this.apiUrl, payment);
  }

  deletePayment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

