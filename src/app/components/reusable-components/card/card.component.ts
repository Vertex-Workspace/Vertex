import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCircleUser, 
          faTrashCan, 
          faEnvelope, 
          faClockRotateLeft 
        } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{

  faCircleUser = faCircleUser;
  faEnvelope = faEnvelope;
  faTrashCan = faTrashCan;
  faClock = faClockRotateLeft;
  
  constructor(private taskService : TaskService){
  
  }
  @Input() task !: Task;
  @Input() width!: string;
  @Input() minHeight!: string;
  @Input() borderColor!: string; 

  @Output() deleteTask = new EventEmitter();

  ngOnInit(): void {
    //Opacity
    this.borderColor += "FD";
  }


  
  
  settings = [
    { id: 'clock', icon: this.faClock, onclick: () => this.clock() },
    { id: 'chat', icon: this.faEnvelope, onclick: () => this.openChat() },
    { id: 'delete', icon: this.faTrashCan, onclick: () => this.delete() }
  ];

  openChat(): void {
    console.log('open chat');
    console.log(this.borderColor);
  }

  delete(): void {
    this.taskService.delete(this.task.id).subscribe(
      (task) => {
        //Alert
        
        this.deleteTask.emit();
      },
      (error) => {

        //Alert
        console.log(error);
      }
    );
  }

  clock(): void {
    console.log('clock');
  }

}
function output(): (target: CardComponent, propertyKey: "deleteTask") => void {
  throw new Error('Function not implemented.');
}

