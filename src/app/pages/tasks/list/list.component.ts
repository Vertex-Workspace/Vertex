import { Component, OnInit } from '@angular/core';
import { 
  taskList, 
  cols
} from '../data-test';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  protected pageSettings?: PageSettingsModel;
  protected taskList = taskList;
  protected cols = cols;

  ngOnInit(): void {
    this.pageSettings = { pageSize: 6 };
  }


}
