import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<{ name: string, isPayed: string }>();  // Mudei o tipo para string

  filtroForm: FormGroup;
  selectedValue: string = 'No';

  constructor(private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    this.criarFiltroForm();
  }

  private criarFiltroForm() {
    this.filtroForm = this.formBuilder.group({
      name:[null],
    });


  }
  onPesquisar() {
    const filters = this.filtroForm.value;
    this.filtersChanged.emit(filters);
}

}
