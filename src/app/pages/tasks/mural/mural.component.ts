import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { Task } from 'src/app/models/task';
import { PersonalizationService } from 'src/app/services/personalization.service';
import { taskList } from '../data-test';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.scss']
})
export class MuralComponent implements OnInit, AfterViewInit {

  @ViewChild('rectangle', { static: false }) rectangleElement: ElementRef | undefined;
  rectangle: any;

  ngAfterViewInit() {
    this.rectangle = this.rectangleElement!.nativeElement;
  }
  
  taskList: Task[] = taskList;
  primaryColor: string;
  secondColor: string;

  ngOnInit(): void {
  }
  


  constructor(private personalization : PersonalizationService){
    this.primaryColor = personalization.getPrimaryColor();
    this.secondColor = personalization.getSecondColor();
  }

  teste():void{
    console.log("teste muasdsral");
  }

  onResizeEnd(event: ResizeEvent): void {
    this.rectangle.style.width = `${event.rectangle.width}px`;
  }

}
