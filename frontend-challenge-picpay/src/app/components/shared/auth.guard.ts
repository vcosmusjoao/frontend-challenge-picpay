import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      const loginData = localStorage.getItem('loginData');
      console.log('Verificando loginData:', loginData);

      if (loginData) {
        const { timestamp } = JSON.parse(loginData);
        const currentTime = new Date().getTime();
        const sessionDuration = 30 * 1000; 
        if (currentTime - timestamp < sessionDuration) {
          console.log('Sessão válida');

          return true; 
        }
      }
      this.logout(); // Chama o logout automático
      return false;
  }

  logout() {
    localStorage.removeItem('loginData');
    this.router.navigate(['/login']);
  }
  
}
