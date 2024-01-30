import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Group } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent {

  form !: FormGroup;

  @Output()
  createGroup = new EventEmitter<Group>()

  constructor( private formBuilder: FormBuilder){}

  onSubmit(): void {
    const group = this.form.getRawValue() as Group
    this.createGroup.emit(group);
  }

}
