import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {


  @Input()
  title!: string;

  @Input()
  width!: string;

  @Input()
  height!: string;
}
