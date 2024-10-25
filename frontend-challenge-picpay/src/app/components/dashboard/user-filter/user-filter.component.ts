import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<{ name: string, isPayed: string }>();

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
