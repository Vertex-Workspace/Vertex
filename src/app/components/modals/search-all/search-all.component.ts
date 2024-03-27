import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SearchItem, SearchItemKind } from 'src/app/models/class/search-item';
import { Team } from 'src/app/models/class/team';
import { User } from 'src/app/models/class/user';
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

  firstSearch !: boolean;

  @ViewChild('searchInput')
  input !: ElementRef;

  constructor(
    private search: SearchService,
    private userService: UserService,
    private router: Router
  ) {
    this.logged = userService.getLogged();
  }

  ngOnInit(): void {
    this.firstSearch = true;
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.focus();
  }

  query: string = "";

  orderSettings: string[]= [
    "Equipes",
    "Projetos",
    "Tarefas",
    "Reponsáveis"
  ];
  orderParam !: string;

  onSearch(): void {
    this.firstSearch = false;
    this.search
      .getSearchedItems(this.logged.id!, this.query)
      .subscribe((items: SearchItem[]) => {
        this.itemsSearched = items;
        console.log(items[5]);
        
      })
                
  }

  handleClick(item: SearchItem): void {
    if (item.kind === SearchItemKind.PROJECT) {
      this.router.navigate([`/projeto/${item.id}/tarefas`]);
    }

    if (item.kind === SearchItemKind.TEAM) {
      this.router.navigate([`/equipe/${item.id}/projetos`]);
    }

    if (item.kind === SearchItemKind.USER) {
      this.router.navigate([`/perfil-usuario/${item.id}`]);
    }

    if (item.kind === SearchItemKind.TASK) {
      this.router.navigate([`/projeto/${item.projectId}/tarefas`]);
    }

    this.closeModal();

  }

  itemsSearched: SearchItem[] = [];

  @Output()
  close = new EventEmitter();
  closeModal(){
    this.close.emit();
  }

  getFirstLetter(item : any): string{
    return item.name.substring(0, 1).toLocaleUpperCase();
  }
}
