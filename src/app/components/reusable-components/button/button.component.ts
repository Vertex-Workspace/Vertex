import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Input()
  background!: string;

  @Input()
  textColor!: string;

  @Output()
  event = new EventEmitter();

  eventEmitter(): void{
    this.event.emit();
  }
}
