import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input()
  title!: string;

  @Input()
  width!: string;

  @Input()
  height!: string;


  @Input()
  icon!: string;

  @Output()
  clickEvent = new EventEmitter();

  checkInput: boolean = false;
  checkText: boolean = false;

  constructor() {}

  border: string = '';

  ngOnInit(): void {
    if (this.icon) {
      this.checkInput = true;
    }

    if (this.title) {
      this.checkText = true;
    }
  }

  eventEmitter(): void {
    this.clickEvent.emit();
  }
}
