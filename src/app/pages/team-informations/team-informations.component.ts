import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faImage, faImagePortrait, faLink } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';


@Component({
    selector: 'app-team-informations',
    templateUrl: './team-informations.component.html',
    styleUrls: ['./team-informations.component.scss']
})
export class TeamInformationsComponent implements OnInit {

    team !: Team;
    //to-do: add creation date, user social media, fix cards, -- charts

    constructor(
        private route: ActivatedRoute,
        private teamService: TeamService
    ) {}

    ngOnInit(): void {
        this.getTeam();
        this.start();
    }

    getTeam(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));

        this.teamService
            .getOneById(id)
            .subscribe((team: Team) => {
                this.team = team;                
            })
        
    }

    start(): void {
        this.clicked = "participants"

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

    getMembersQtt(): number | undefined {
        return this.team.users?.length;
    }

    // ICONS
    faLink = faLink;
    faImage = faImage;
    faCircleUser = faCircleUser;
    faSearch = faSearch;
    faEnvelope = faEnvelope;
    faUserMinus = faUserMinus;
    faComment = faComment;
    faChevronDown = faChevronDown;

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


    changePreviewMode(preview: string): void {
        this.clicked = preview;
    }


    swapPermissionExpanded(id: number): void {
        // this.users[id].open = !this.users[id].open;
    }

}
