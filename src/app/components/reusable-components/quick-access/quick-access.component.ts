import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss']
})
export class QuickAccessComponent implements OnInit {
  basicData: any;

  @Input()
  typeString!: String;

  ngOnInit() {
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

  recentsTeams: any[] = [
    { image: "../../../assets/teste/teste.jpg", name: "AKMO", date: "11/10/2023"},
    { image: "../../../assets/teste/teste.jpg", name: "AKMO", date: "11/10/2023"},
    { image: "../../../assets/teste/teste.jpg", name: "AKMO", date: "11/10/2023"}
  ]

  redirect(section: any): string {
    console.log('tasks/' + section.id)
    return 'tasks/' + section.id;
  }
}
