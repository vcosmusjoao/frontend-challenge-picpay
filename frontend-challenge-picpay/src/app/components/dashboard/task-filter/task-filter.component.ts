import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<{ name: string, isPayed: boolean }>();


  isPayedOptions = [  
    { label: 'Paid', value: true },
    { label: 'Not Paid', value: false }
  ];
  filtroForm: FormGroup;
  selectedValue: string = 'No';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.criarFiltroForm();
  }

  updateNameFilter(event){

  }

  private criarFiltroForm() {
    this.filtroForm = this.formBuilder.group({
      name:[null],
      isPayed:[false]
    });


  }

  onPesquisar() {
    const filters = this.filtroForm.value;
    this.filtersChanged.emit(filters);
  }



}
