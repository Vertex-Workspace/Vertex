

export class ReviewCheck {
    taskID !: number;
    reviewerID !: number;
    grade !: number;
    finalDescription !: string;
    approveStatus ?: ApproveStatus;
}

export class SentToReview {
    description!: string;
    userThatSentReview!: {
        id: number;
    };
    task!: {
        id: number;
    };
    
}

export enum ApproveStatus {
    APPROVED = "APPROVED",
    DISAPPROVED = "DISAPPROVED",
}