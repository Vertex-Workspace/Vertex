import { Component, OnInit } from '@angular/core';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  faUserTie = faUserTie;

  logs: any = [];
  basicData: any;
  basicOptions: any;
  errorCounts: { [key: string]: number } = {};

  constructor(private logService: LogsService) {
    this.logService.getLogs().subscribe((logs: any) => {
      console.log(logs);
      this.logs = logs;
      
      this.logs.forEach((log: any) => {
        if (this.errorCounts[log.exceptionMessage]) {
          this.errorCounts[log.exceptionMessage]++;
        } else {
          this.errorCounts[log.exceptionMessage] = 1;
        }
      });

      this.updateChartData();
    });
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
    };
  }

  updateChartData() {
    const labels = Object.keys(this.errorCounts);
    const data = Object.values(this.errorCounts);

    this.basicData = {
      labels: labels,
      datasets: [
        {
          label: 'Quantidade de Erros',
          data: data,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }
      ]
    };
  }
}
