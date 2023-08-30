import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  title!: string;

  @Input()
  width!: string;

  @Input()
  height!: string;

  @Input()
  background!: string;

  @Input()
  textColor!: string;

  @Input()
  icon!: string;

  @Output()
  clickEvent = new EventEmitter();


  validaInput:boolean = false;

  constructor(){
    console.log(this.icon);
    if (this.icon !== "") {
      this.validaInput = true;
    } else {
      this.validaInput = false;
    }
  }


  eventEmitter(): void {
    this.clickEvent.emit();
  }
}
