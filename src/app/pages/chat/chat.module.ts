import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputModule } from "../../components/reusable-components/input/input.module";


@NgModule({
    declarations: [
        ChatComponent
    ],
    exports: [ChatComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        InputModule
    ]
})
export class ChatModule { }
