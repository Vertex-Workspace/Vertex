

export class Review {

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