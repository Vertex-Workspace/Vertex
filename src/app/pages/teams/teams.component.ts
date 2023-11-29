import { Component } from '@angular/core';
import { catchError } from 'rxjs';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {

  constructor(private teamService: TeamService) {

  }

  isCreating: boolean = false;
  clicked: string = 'task';
  menuItems = [
    { id: 'task', iconClass: 'pi pi-list', label: 'Tarefas' },
    { id: 'team', iconClass: 'pi pi-users', label: 'Equipes' },
  ];

  teams: Team[] = [];

  changePreviewMode(preview: string): void {
    this.clicked = preview;
    if (this.clicked == "team") {
      this.teamService.getAll().subscribe((teams) => {
        this.teams = teams;
      });
    } else {
      this.teams = [];
    }
  }

  switchCreateView(): void {
    this.isCreating = !this.isCreating;
    if (!this.isCreating) {
      this.teamService.getAll().subscribe((teams) => {
        this.teams = teams;
      });
    } else {
      this.teams = [];
    }
  }
  //TASKS - FILTER AND ORDER
  filterSettings: any[] = [];
  orderSettings: any[] = [];

  configItems = [
    { id: 'filter', iconClass: 'pi pi-filter', click: () => this.clickFilter() },
    { id: 'order', iconClass: 'pi pi-arrow-right-arrow-left', click: () => this.clickOrder() },
  ];

  filterOpen: boolean = false;
  orderOpen: boolean = false;

  clickFilter(): void {
    this.filterOpen = !this.filterOpen;
  }

  clickOrder(): void {
    this.orderOpen = !this.orderOpen;
  }


}
