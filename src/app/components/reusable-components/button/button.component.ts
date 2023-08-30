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
  background!: string;

  @Input()
  textColor!: string;

  @Input()
  icon!: string;

  @Output()
  clickEvent = new EventEmitter();


  validaInput:boolean = false;

  constructor(){}

  borderDale: string = "";

  ngOnInit(): void {
    if (this.icon == undefined) {
      this.validaInput = false;
    } else {
      this.validaInput = true;
    }
  }

  changeColor():void{
    let backgroundDefault: string = this.background;
    this.background = this.textColor;
    this.textColor = backgroundDefault;
  }

  eventEmitter(): void {
    this.clickEvent.emit();
  }
}
