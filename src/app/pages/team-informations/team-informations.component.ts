import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-team-informations',
    templateUrl: './team-informations.component.html',
    styleUrls: ['./team-informations.component.scss']
})
export class TeamInformationsComponent {
    // ICONS
    faLink = faLink;
    faCircleUser = faCircleUser;
    faSearch = faSearch;
    faEnvelope = faEnvelope;
    faUserMinus = faUserMinus;
    faComment = faComment;

    // VARIABLES
    clicked!: string;
    @Input()
    basicData: any;
    @Input()
    basicOptions: any;
    @Input()
    data: any;
    @Input()
    options: any;

    menuItems = [
        { id: 'participants', iconClass: 'pi pi-users', label: 'Visualizar participantes' },
        { id: 'permissions', iconClass: 'pi pi-lock', label: 'Gerenciar permissões' }
    ];

    

    users = [
        { picture: "", name: "Ana Borchardt", function: "Front-end developer", socialMedia: [faUserMinus,faEnvelope,faComment] },
        { picture: "", name: "Kaique Fernandes", function: "Front-end developer", socialMedia: [faUserMinus,faEnvelope,faComment] },
        { picture: "", name: "Miguel Bertoldi", function: "Back-end developer", socialMedia: [faUserMinus,faEnvelope,faComment] },
        { picture: "", name: "Otávio Rocha", function: "Front-end developer", socialMedia: [faUserMinus,faEnvelope,faComment] }, 
    ];

    changePreviewMode(preview: string): void {
        this.clicked = preview;
    }

    ngOnInit() {

        this.clicked = "participants"

        console.log(this.users);
        
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


        this.basicData = {
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

        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
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

        this.data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }
}
