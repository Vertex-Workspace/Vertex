import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputModule } from "../../components/reusable-components/input/input.module";
import { FormsModule } from '@angular/forms';

import { ImageModule } from 'primeng/image';


@NgModule({
    declarations: [
        ChatComponent,
    ],
    exports: [ChatComponent],
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        ImageModule,
        InputModule,

    ]
})
export class ChatModule { }
