import { Component } from '@angular/core';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent{

  isCreating: boolean = true;
  clicked: string = 'team';
  menuItems = [
    { id: 'task', iconClass: 'pi pi-list', label: 'Tarefas' },
    { id: 'team', iconClass: 'pi pi-users', label: 'Equipes' },
  ];

  changePreviewMode(preview: string): void {
    this.clicked = preview;
  }

  createNewTeam():void{
    this.isCreating = !this.isCreating;
  }
}
