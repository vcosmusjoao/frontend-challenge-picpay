import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private validUser = { email: 'usuario@gmail.com', password: 'usuario' };

  constructor() { }
  login(email: string, password: string): boolean {
    return email === this.validUser.email && password === this.validUser.password;
  }
}
