import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEarthAsia, faImage, faImagePortrait, faLink } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Group } from 'src/app/models/class/groups';
import { Team } from 'src/app/models/class/team';
import { User } from 'src/app/models/class/user';
import { AlertService } from 'src/app/services/alert.service';
import { GroupService } from 'src/app/services/group.service';
import { TeamService } from 'src/app/services/team.service';
import { catchError, of, switchMap, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';


@Component({
    selector: 'app-team-informations',
    templateUrl: './team-informations.component.html',
    styleUrls: ['./team-informations.component.scss']
})
export class TeamInformationsComponent implements OnInit {

    onClipboardCopy($event: Event) {
        throw new Error('Method not implemented.');
    }



    invitationCode!: {
        code: string;
    };
    team!: Team;
    //to-do: add creation date, user social media, fix cards, -- charts

    constructor(
        private route: ActivatedRoute,
        private teamService: TeamService,
        private alertService: AlertService,
        private groupService: GroupService,
        private userService: UserService
    ) {
        this.team = this.getTeam();
    }

    ngOnInit() {
        this.start();
        console.log(this.team);
    }

    sla() {
        let aaa = this.copyInviteLink();
        console.log(aaa);

        this.getGroup();
        this.getUser();
    }

    getTeam(): Team {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.teamService.getOneById(id).subscribe(
            (team: Team) => {
                this.team = team;
                console.log(this.team);
                return team;
            },
            (error) => {
                console.log(error);
            }
        )
        return this.team;
    }


    copyInviteLink() {
        this.teamService.getInvitationCodeById(this.team.id!).subscribe(
            (invitationCode: any) => {
                this.team.invitationCode = invitationCode;
                this.invitationCode = invitationCode;

                const id = Number(this.route.snapshot.paramMap.get('id'));

                navigator.clipboard.writeText("http://localhost:4200/aceitar-convite/" + id + "/" + invitationCode.invitationCode)
                return invitationCode;
            },
            (error) => {

                console.log(error);
            }
        )

        this.alertService.successAlert("Link copiado com sucesso!");


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
    createGroupModal: boolean = false
    @Input()
    basicData: any;
    @Input()
    basicOptions: any;
    @Input()
    data: any;
    @Input()
    options: any;
    placeholder: string = 'Pesquise por um participante...'

    menuItems = [
        {
            id: 'participants',
            iconClass: 'pi pi-user',
            label: 'Participantes',
            placeholder: 'Pesquise por um participante...',
            clicked: true
        },
        {
            id: 'groups',
            iconClass: 'pi pi-users',
            label: 'Grupos',
            placeholder: 'Pesquise por um grupo...',
            clicked: false
        }
    ];


    changePreviewMode(preview: string): void {
        this.clicked = preview;
        if (preview === 'participants') {
            this.placeholder = this.menuItems[0].placeholder
            this.menuItems[0].clicked = true
            this.menuItems[1].clicked = false
        } else {
            this.placeholder = this.menuItems[1].placeholder
            this.menuItems[1].clicked = true
            this.menuItems[0].clicked = false
        }

    }

    getGroup(): any[] {
        return this.team?.groups!;
    }

    getUser(): any[] {
        return this.team?.users!
    }

    deleteGroup(groupId: Group): void {
        console.log(groupId);
        this.groupService.delete(groupId.id).subscribe((group: Group) => {
            this.alertService.successAlert('Grupo deletado com sucesso')
            this.team.groups?.splice(this.team.groups.indexOf(groupId), 1)

        },
            e => {
                this.alertService.errorAlert("Não foi possível deletar");
            })
    }

    deleteUserTeam(user: User): void {
        this.teamService.getTeamCreator(this.team).subscribe((userC) => {
            if (userC.id === this.userService.getLogged().id) {
                this.teamService.deleteUserTeam(this.team, user).subscribe((team: Team) => {
                    this.alertService.successAlert("Usuário retirado da equipe")
                })
            } else {
                this.alertService.errorAlert("Você não pode remover o criador da equipe")
            }
        });
    }

    openModalCreateGroup() {
        this.createGroupModal = true
    }

    createGroup(group: Group): void {
        this.groupService
            .create(group)
            .subscribe((group: Group) => {
                this.alertService.successAlert(`Grupo ${group.name} criado com sucesso!`);
                this.team.groups?.splice(this.team.groups.push(group))
                this.switchCreateViewGroup();
            },
                e => {
                    if (group.name == null) {
                        this.alertService.errorAlert(`Você precisa adicionar um nome`)
                    } else {
                        this.alertService.errorAlert(`Erro ao criar grupo`)
                    }
                });
    }

    switchCreateViewGroup(): void {
        this.createGroupModal = !this.createGroupModal;
    }
}
