import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  notifications : boolean = true;

  @Input()
  currentRoute !: string;

  constructor() {}

  ngOnInit(): void {
  }

  @Output()
  openNotification = new EventEmitter();

  openNotifications():void{
    this.openNotification.emit();
  }
}
