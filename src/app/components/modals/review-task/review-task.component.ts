import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalWarnModule } from '../modal-warn/modal-warn.module';
import { RatingModule } from 'primeng/rating';
import { TaskWaitingToReview } from 'src/app/models/class/task';
import { ApproveStatus, ReviewCheck } from 'src/app/models/class/review';
import { UserService } from 'src/app/services/user.service';
import { ReviewService } from 'src/app/services/review.service';
import { User } from 'src/app/models/class/user';
import { AlertService } from 'src/app/services/alert.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-review-task',
  templateUrl: './review-task.component.html',
  styleUrls: ['./review-task.component.scss'],
  standalone: true,
  imports: [BrowserModule, CommonModule, ModalWarnModule, RatingModule, FormsModule,TranslateModule]
})
export class ReviewTaskComponent {

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private reviewService: ReviewService
  ) {

  }

  @Output() closeModal = new EventEmitter<TaskWaitingToReview[]>();

  @Input() tasksToReview!: TaskWaitingToReview[];

  badgeNumber: string = '0';
  value = 0;
  taskBeingReviewed!: TaskWaitingToReview;
  logged!: User;

  ngOnInit(): void {
    this.logged = this.userService.getLogged();
    this.taskBeingReviewed = this.tasksToReview[0];
  }

  performanceTable: any[] = [];
  selectedReviewTask(taskReview: TaskWaitingToReview) {
    this.taskBeingReviewed = taskReview;
  }

  closeReview() {
    if (this.tasksToReview.length == 0) {
      this.alertService.successAlert("Todas tarefas foram revisadas!");
    }
    this.closeModal.emit(this.tasksToReview);
  }


  isTaskReviewed(taskToReview: TaskWaitingToReview): boolean {
    return taskToReview.id === this.taskBeingReviewed.id;
  }


  finalReviewResult: ReviewCheck = {
    taskID: 0,
    reviewerID: 0,
    grade: 0,
    finalDescription: "",
  }

  finalReview(approved: boolean) {
    this.finalReviewResult.taskID = this.taskBeingReviewed.id!;
    this.finalReviewResult.reviewerID = this.logged.id!;
    this.finalReviewResult.grade = this.value;
    this.finalReviewResult.approveStatus = approved ? ApproveStatus.APPROVED : ApproveStatus.DISAPPROVED;

    this.reviewService.finalReview(this.finalReviewResult).subscribe(
      (response) => {
        this.alertService.successAlert("Revisão finalizada com sucesso!");
        this.tasksToReview = this.tasksToReview.filter(task => task.id !== this.taskBeingReviewed.id);
        this.badgeNumber = this.tasksToReview.length.toString();

        if (this.tasksToReview.length > 0) {
          this.taskBeingReviewed = this.tasksToReview[0];  
          this.resetValues();
        } else {
          setTimeout(() => {
            this.closeReview();
          }, 500);
        }
      },
      (error) => {
        this.alertService.errorAlert(error.error);
      }
    );
  }

  private resetValues() {
    this.finalReviewResult = {
      taskID: 0,
      reviewerID: 0,
      grade: 0,
      finalDescription: "",
    }
    this.value = 0;
  }
}
