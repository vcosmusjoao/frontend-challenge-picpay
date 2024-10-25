import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Account } from 'src/app/models/account';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: Account[] = [];
  filteredUsers: Account[] = [];
  tittleModal = "";
  editedAccount: Account | null = null; 
  visible: boolean = false; 
  currentUser: Account | null = null; 

  constructor(private service: AuthService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadAccounts();
    this.getCurrentUser();
  }

  loadAccounts(): void {
    this.service.getAccounts().subscribe(
      (users) => {
        this.users = users.sort((a, b) => b.id - a.id);
        this.filteredUsers = [...this.users]; 
      },
      (error) => {
        this.showToast('error', 'Erro', 'Falha ao carregar usuários.');
      }
    );
  }

  getCurrentUser(): void {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      this.currentUser = JSON.parse(loggedUser);
    }
  }

  onFiltersChanged(filters: { name: string, isPayed: boolean }): void {
    this.service.getAccounts(filters).subscribe(
      (users) => {
        this.filteredUsers = users.filter(user => 
          (!filters.name || user.name.includes(filters.name))
        );
      },
      (error) => {
        this.showToast('error', 'Erro', 'Falha ao aplicar filtros.');
      }
    );
  }

  addUser(newUser: Account): void {
    this.users.push(newUser);
    this.filteredUsers = [...this.users]; // Atualiza a lista filtrada
    this.visible = false; 
  }

  openCreateDialog(): void {
    this.editedAccount = null;
    this.tittleModal = "Novo Usuário";
    this.visible = true;
  }

  openEditDialog(account: Account): void {
    this.editedAccount = { ...account };
    this.tittleModal = "Editar Usuário";
    this.visible = true;
  }

  deleteUser(item: Account): void {
    if (this.currentUser && item.id === this.currentUser.id) {
      this.showToast('warn', 'Atenção', 'Você não pode excluir seu próprio usuário.');
      return;
    }
    this.service.deleteAccount(item.id).subscribe(
      () => {
        this.users = this.users.filter(user => user.id !== item.id);
        this.filteredUsers = this.filteredUsers.filter(user => user.id !== item.id); // Atualiza a lista filtrada
        this.showToast('success', 'Sucesso', 'Usuário excluído com sucesso.');
      },
      (error) => {
        this.showToast('error', 'Erro', 'Falha ao excluir usuário.');
      }
    );
  }

  private maskPassword(password: string): string {
    return password ? '*'.repeat(password.length) : '';
  }

  showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, life: 2000 });
  }
}
