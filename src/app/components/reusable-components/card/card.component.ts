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
    this.borderColor = this.borderColor.substring(0, this.borderColor.length - 2);;
  }

  modalDelete: boolean = false;
  
  
  settings = [
    { id: 'clock', icon: this.faClock, onclick: () => this.clock() },
    { id: 'chat', icon: this.faEnvelope, onclick: () => this.openChat() },
    { id: 'delete', icon: this.faTrashCan, onclick: () => this.openModalDelete() }
  ];

  openChat(): void {

  }

  openModalDelete(): void {
    this.modalDelete = true;
  }

  delete(event: any): void {
    this.modalDelete = false;
    console.log(event);
    if(event){
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
  }

  clock(): void {
    console.log('clock');
  }
  
  @Output() openTaskDetails = new EventEmitter();
  openTask(): void {
    if(!this.modalDelete){
      this.openTaskDetails.emit();

      

    }
  }

  @Output() current = new EventEmitter();
  takeCurrentTime(): void {
    
  }

  dale(): void {
    console.log('dale');
  }

}

