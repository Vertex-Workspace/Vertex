import { Component, EventEmitter, Output } from '@angular/core';
import { Team } from 'src/app/models/class/team';
import { User } from 'src/app/models/class/user';
import { SearchItem } from 'src/app/models/class/search-item';
import { ProjectService } from 'src/app/services/project.service';
import { SearchService } from 'src/app/services/search.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.scss']
})
export class SearchAllComponent {

  logged !: User;

  constructor(
    private search: SearchService,
    private userService: UserService,
  ) {
    this.logged = userService.getLogged();
  }

  query: string = "";

  orderSettings: string[]= [
    "Equipes",
    "Projetos",
    "Tarefas",
    "Reponsáveis"
  ];

  onSearch(): void {
    this.search
      .getSearchedItems(this.logged.id!, this.query)
      .subscribe((items: SearchItem[]) => {
        this.itemsSearched = items;
      })
                
  }

  itemsSearched: SearchItem[] = [];

  @Output()
  close = new EventEmitter();
  closeModal(){
    this.close.emit();
  }
}
