import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  editedTask: Task | null = null; // Para controlar edição
  visible: boolean = false; 

  constructor(private service: TaskService) {}

  ngOnInit(): void {
   this.loadTasks();
  }

  openCreateDialog() {
    this.editedTask = null;
    this.visible = true;
  }

  openEditDialog(task: Task) {
    this.editedTask = { ...task }; // Clona a tarefa para evitar alterações diretas
    this.visible = true;
  }

  deleteTask(item: Task) {
    this.service.deleteTask(item.id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== item.id);
    });
  }

  loadTasks() {
    this.service.getTasks().subscribe((tasks) => {
      this.tasks = tasks.sort((a,b)=>{
        return b.id - a.id;
      });
    });
  }

  showDialog() {
    this.visible = true;
  }

  addTask(newTask: any) {
    this.tasks.push(newTask);
    this.visible = false; // fecha o diálogo após a criação da tarefa
  }

  onFiltersChanged(filters: { name: string, isPayed: boolean }) {
    this.service.getTasks(filters).subscribe((tasks) => {
      this.tasks = tasks;
      this.filteredTasks = tasks.filter(task => {
        const matchesName = filters.name ? task.name.includes(filters.name) : true;
        const matchesIsPayed = filters.isPayed !== null ? task.isPayed === filters.isPayed : true;
        return matchesName && matchesIsPayed;
      });
    });
  }
}
