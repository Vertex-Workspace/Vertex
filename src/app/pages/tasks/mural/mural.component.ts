import { AfterViewInit, 
         Component, 
         ElementRef, 
         OnInit, 
         QueryList, 
         ViewChildren } from '@angular/core';
import { Task } from 'src/app/models/task';
import { PersonalizationService } from 'src/app/services/personalization.service';
import { taskList } from '../data-test';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.scss']
})
export class MuralComponent implements OnInit, AfterViewInit {

  @ViewChildren('card', { read: ElementRef })
  cards !: QueryList<any>;

  taskList: Task[] = taskList;
  primaryColor: string;
  secondColor: string;

  constructor(
    private personalization : PersonalizationService
  ){
    this.primaryColor = personalization.getPrimaryColor();
    this.secondColor = personalization.getSecondColor();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
function ViewChild(arg0: string, arg1: { static: boolean; }) {
  throw new Error('Function not implemented.');
}

