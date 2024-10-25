import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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
  tittleModal = "";

  editedTask: Task | null = null; 
  visible: boolean = false; 

  constructor(private service: TaskService) {}

  ngOnInit(): void {
   this.loadTasks();
  }

  openCreateDialog() {
    this.editedTask = null;
    this.tittleModal = "Nova Task";
    this.visible = true;
  }

  openEditDialog(task: Task) {
    this.editedTask = { ...task };
    this.tittleModal= "Editar Task";
    this.visible = true;
  }

  deleteTask(item: Task) {
    this.service.deleteTask(item.id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== item.id);
      this.loadTasks();
    });
  }

  onTaskCreated(){
    this.loadTasks();
    this.visible = false
  }
  
  onTaskUpdated(){
    this.loadTasks();
    this.visible = false; 
  }

  loadTasks() {
    this.service.getTasks().subscribe((tasks) => {
      this.tasks = tasks.sort((a,b)=>{
        this.filteredTasks = [...this.tasks];
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

  applyFilter(field: string, value: any) {
    this.filteredTasks = this.tasks.filter(task => {
      const matchesName = field === 'name' ? task.name.includes(value) : true;
      const matchesTitle = field=== 'title'? task.title.includes(value):true;
      const matchesValue = field === 'value' ? task.value.toString().includes(value) : true;
      // const matchesDate = field === 'date' ? (task.date?.toDateString() === value?.toDateString()) : true;
      const matchesIsPayed = field === 'isPayed' ? (value === null || task.isPayed === value) : true;
      return matchesName && matchesTitle && matchesValue  && matchesIsPayed;
    });
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
