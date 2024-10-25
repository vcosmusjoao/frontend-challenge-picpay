import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  isLoading = false; // Controle do estado de carregamento

  constructor(
    private authService: AuthService,
     private router: Router,
     private messageService: MessageService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.login(this.email, this.password).subscribe((isValid) => {
      if (isValid) {
        const loginData = { timestamp: new Date().getTime() };
        localStorage.setItem('loginData', JSON.stringify(loginData));
        setTimeout(() => {
          this.isLoading = false;
          this.startSessionTimer();
          this.router.navigate(['/dashboard']);
        }, 4000);
        this.showToast('success', 'Sucesso', 'Login Realizado com Sucesso');
      } else {
        this.isLoading = false;
        this.showToast('error', 'Erro', 'Credenciais Inválidas');
      }
    });
  }
  
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail, life: 2000 });
  }

  logout() {
    localStorage.removeItem('loginData');
    this.router.navigate(['/login']);
  }

  startSessionTimer() {
    setTimeout(() => {
        this.showToast('warn', 'Atenção', 'Sua sessão irá expirar em 30 segundos');
        setTimeout(() => {
            this.logout();
        }, 30000); 
    }, 270000); 
}
}
