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

  itemsSearched: any[]=[
    {color: "black", name: "Projeto X", date: new Date().toLocaleDateString()},
    {color: "black", name: "Projeto X", date: new Date().toLocaleDateString()},
    {color: "black", name: "Projeto X", date: new Date().toLocaleDateString()},
    {color: "black", name: "Projeto X", date: new Date().toLocaleDateString()},
    {color: "black", name: "Projeto X", date: new Date().toLocaleDateString()},
    {color: "black", name: "Projeto X", date: new Date().toLocaleDateString()},
    {color: "black", name: "Projeto X", date: new Date().toLocaleDateString()}
  ]

  @Output()
  close = new EventEmitter();
  closeModal(){
    this.close.emit();
  }
}
