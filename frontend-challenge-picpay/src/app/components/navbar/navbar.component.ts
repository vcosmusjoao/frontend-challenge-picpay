import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  nomeUsuarioLogado: string | null = '';
  items: MenuItem[];


  constructor(private authService: AuthService, private router: Router) {
    this.items = [
      {label:'Consultar Usuários', icon:'pi pi-users', command:()=> this.router.navigate(['/users'])},
      {label:'Sair', icon:'pi pi-sign-out', command: () => this.onLogout()
    }

    ]
   }

  ngOnInit(): void {
    const user = localStorage.getItem('loggedUser');
    if (user) {
      this.nomeUsuarioLogado = JSON.parse(user).name; // Exibe o nome do usuário
    }
  }

  onLogout(){
    this.authService.logout();
  }

}
