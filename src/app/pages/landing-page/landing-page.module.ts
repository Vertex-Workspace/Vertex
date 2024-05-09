import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { LandingPageComponent } from './landing-page.component';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { KanbanModule } from "../tasks/kanban/kanban.module";
import { CardModule } from "../../components/reusable-components/card/card.module";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RowCardModule } from "../../components/reusable-components/row-task/row-card.module";
import { GalleriaModule } from 'primeng/galleria';


@NgModule({
    declarations: [
        LandingPageComponent
    ],
    exports: [
        LandingPageComponent
    ],
    imports: [
        CommonModule,
        MatMenuModule,
        TranslateModule,
        CarouselModule,
        TagModule,
        KanbanModule,
        CardModule,
        DragDropModule,
        RowCardModule,
        GalleriaModule
    ]
})
export class LandingPageModule { }
