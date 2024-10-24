import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users:Account [] = [];
  filteredUsers: Account[] = [];

  tittleModal = "";

  editedAccount: Account | null = null; 
  visible: boolean = false; 
  constructor(private service: AuthService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.service.getAccounts().subscribe((users) => {
      this.users = users.sort((a,b)=>{
        return b.id - a.id;
      });
    });
  }

  onFiltersChanged(filters: { name: string, isPayed: boolean }) {
    this.service.getAccounts(filters).subscribe((users) => {
      this.users = users;
      this.filteredUsers = users.filter(user => {
        const matchesName = filters.name ? user.name.includes(filters.name) : true;
        return matchesName;
      });
    });
  }

  
  addUser(newUser: any) {
    this.users.push(newUser);
    this.visible = false; 
  }

  openCreateDialog() {
    this.editedAccount = null;
    this.tittleModal = "Novo Usuário";
    this.visible = true;
  }

  openEditDialog(account: Account) {
    this.editedAccount = { ...account };
    this.tittleModal= "Editar Usuário";
    this.visible = true;
  }

  deleteUser(item: Account) {
    this.service.deleteAccount(item.id).subscribe(() => {
      this.users = this.users.filter(task => task.id !== item.id);
      this.loadTasks();
    });
  }

  private maskPassword(password: string): string {
    if(password){
      return '*'.repeat(password.length);
    }else{
      return '';
    }
  }

}
