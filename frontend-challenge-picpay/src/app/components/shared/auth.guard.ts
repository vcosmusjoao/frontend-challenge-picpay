import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const loginData = localStorage.getItem('loginData');
    if (loginData) {
      const { timestamp } = JSON.parse(loginData);
      const currentTime = new Date().getTime();
      const sessionDuration = 30 * 60 * 1000;
      if (currentTime - timestamp < sessionDuration) {
        const newLoginData = { timestamp: currentTime };
        localStorage.setItem('loginData', JSON.stringify(newLoginData));
        return true;
      }
    }
    this.logout();
    return false;
  }

  logout() {
    localStorage.removeItem('loginData');
    this.router.navigate(['/login']);
  }
}
