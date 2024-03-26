import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.scss']
})
export class SearchAllComponent {
  query: string = "";

  orderSettings: string[]= [
    "Equipe",
    "Projetos",
    "Tarefas",
    "Reponsáveis"
  ];

  search(): void {

  }

  itemsSearched: any[] = [];

  @Output()
  close = new EventEmitter();
  closeModal(){
    this.close.emit();
  }
}
