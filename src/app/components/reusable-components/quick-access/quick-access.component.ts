import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss']
})
export class QuickAccessComponent implements OnInit {
  basicData: any;

  @Input()
  typeString!: String;

  @Input()
  recentTeams !: Team[];

  constructor(
    private teamService: TeamService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
      this.start();
  }

  start(): void {
    const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.basicData = {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [
              {
                  label: 'Tarefas',
                  data: [540, 325, 702, 620],
                  backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                  borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                  borderWidth: 1
              }
          ]
      };
  }

  workSpace: any[] = [
    {id: 'kanban', icon: "pi pi-th-large", label: "Kanban"},
    {id: 'calendar', icon: "pi pi-calendar", label: "Calendário"},
    {id: 'list', icon: "pi pi-list", label: "Linhas"},
    {id: 'mural', icon: "pi pi-chart-bar", label: "Mural"},
  ]

  redirect(section: any): string {
    console.log('tasks/' + section.id)
    return 'tasks/' + section.id;
  }


}
