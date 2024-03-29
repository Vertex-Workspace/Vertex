import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { RowCardComponent } from 'src/app/components/reusable-components/row-task/row-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RowCardModule } from 'src/app/components/reusable-components/row-task/row-card.module';
import { ConfirmModalModule } from 'src/app/components/modals/confirm-modal/confirm-modal.module';
import { PipesModule } from "../../../pipes/module/pipes.module";



@NgModule({
    declarations: [
        ListComponent,
    ],
    exports: [
        ListComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        DragDropModule,
        RowCardModule,
        ConfirmModalModule,
        PipesModule
    ]
})
export class ListModule { }