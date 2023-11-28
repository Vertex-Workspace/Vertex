import { Component } from '@angular/core';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-informations',
  templateUrl: './user-informations.component.html',
  styleUrls: ['./user-informations.component.scss']
})
export class UserInformationsComponent {
  faCircleUser = faCircleUser;
  faTrashCan = faTrashCan;

  dataPie: any;
  optionsPie: any;

  dataBar: any;
  optionsBar: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.dataPie = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };


    this.optionsPie = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };

    const documentStyle1 = getComputedStyle(document.documentElement);
    const textColor1 = documentStyle1.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle1.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle1.getPropertyValue('--surface-border');

    this.dataBar = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [540, 325, 702, 620],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.optionsBar = {
      plugins: {
        legend: {
          labels: {
            color: textColor1
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };


  }

  projects = [
    {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 61.00
    }, {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 30.50
    }, {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 20.50
    }, {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 20.35
    }, {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 20.35
    }, {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 20.35
    }, {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 20.35
    }, {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 20.35
    }, {
      name: 'Project 1',
      description: 'Front-end do sistema de gerenciamento de projetos',
      date: '01/01/2021',
      color: '#092c4c',
      progress: 20.35
    },
  ]

}


