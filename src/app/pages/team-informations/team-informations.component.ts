import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheck, faImage, faLink, faPencil } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
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
import { UserService } from 'src/app/services/user.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-team-informations',
    templateUrl: './team-informations.component.html',
    styleUrls: ['./team-informations.component.scss']
})
export class TeamInformationsComponent implements OnInit {
    onClipboardCopy($event: Event) {
        throw new Error('Method not implemented.');
    }

    groups !: Group[]


    invitationCode!: {
        code: string;
    };
    teamObservable!: Observable<Team>;
    team!: Team;
    //to-do: add creation date, user social media, fix cards, -- charts

    constructor(
        private route: ActivatedRoute,
        private teamService: TeamService,
        private alertService: AlertService,
        private groupService: GroupService,
        private userService: UserService
    ) {
        this.team = this.getTeam()!;
    }

    ngOnInit() {
        this.clicked = "participants"

    }

    getTeam() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.teamObservable = this.teamService.getOneById(id);

        this.teamObservable.forEach((team) => {
            this.team = team;

            console.log(this.team);
            //Graphics
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text');
            this.basicData = {
                labels: ['Não Iniciadas', 'Em Andamento', 'Concluídas'],
                datasets: [
                    {
                        label: '',
                        data: this.team.tasksPerformances,
                        backgroundColor: ["#ffe2dd", "#fdecc8", "#dbeddb"],
                        borderColor: ["#ffe2dd", "#fdecc8", "#dbeddb"],
                        borderWidth: 1
                    }
                ]
            };
            this.basicOptions = {
                plugins: {
                    legend: {
                        labels: {
                            color: "white"
                        }
                    }
                },
            };
            if (this.team.image) {
                this.selectedFile = true;
            }

            if (this.team.users!.length > 1 && this.menuItems.length < 2) {
                this.menuItems.push({
                    id: 'groups',
                    iconClass: 'pi pi-users',
                    label: 'Grupos',
                    placeholder: 'Pesquise por um grupo...',
                    clicked: false
                });
            }

            return team;
        });
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





    // ICONS
    faLink = faLink;
    faImage = faImage;
    faCircleUser = faImage;
    faSearch = faSearch;
    faEnvelope = faEnvelope;
    faUserMinus = faUserMinus;
    faComment = faComment;
    faChevronDown = faChevronDown;
    faPencil = faPencil;
    faCheck = faCheck;

    // VARIABLES
    clicked!: string;
    createGroupModal: boolean = false
    basicData: any;
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

    deleteGroup(groupId: Group): void {
        this.groupService.delete(groupId.id).subscribe((group: Group) => {
            this.alertService.successAlert('Grupo deletado com sucesso')
            this.getTeam()
        },
            (e) => {
                this.alertService.errorAlert("Não foi possível deletar");
            })
    }

    deleteUser !: boolean
    userToDelete !: User

    openModalDeleteUser(event: any) {
        this.userToDelete = event
        this.deleteUser = true;
    }

    deleteUserTeam(event: any): void {
        if (event) {
            console.log(this.team.creator);

            if (this.team.creator!.id === this.userService.getLogged().id) {
                this.teamService.deleteUserTeam(this.team, this.userToDelete).subscribe((team: Team) => {
                    this.alertService.successAlert("Usuário retirado da equipe");
                    this.team.users!.splice(this.team.users!.indexOf(this.userToDelete), 1);
                })
            } else {
                this.alertService.errorAlert("Você não pode remover o criador da equipe")
            }

        }
        this.deleteUser = false
    }

    openModalCreateGroup() {
        this.createGroupModal = true
    }

    createGroup(group: Group): void {
        this.groupService
            .create(group)
            .subscribe((group: Group) => {
                this.alertService.successAlert(`Grupo criado com sucesso!`);
                console.log(group.name);

                this.switchCreateViewGroup();
                this.getTeam()
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


    editDescription: boolean = false;
    changeEditDescription(): void {
        this.editDescription = !this.editDescription

        if (!this.editDescription) {
            this.teamService.updateTeam(this.team).subscribe(
                (team: Team) => {
                    this.alertService.successAlert("Descrição atualizada com sucesso")
                });
        }
    }

    inputEditName: boolean = false;
    newName: string = "";
    editName(): void {
        this.inputEditName = !this.inputEditName;
        if (this.inputEditName) {
            this.newName = this.team.name;
        } else {
            //Validação
            if (this.newName.length < 3 || this.newName.length > 30) {
                this.alertService.notificationAlert("Nome deve ter entre 4 e 29 caracteres");
                this.newName = "";
                return;
            }
            this.team.name = this.newName;
            //Caso a validação seja feita é feito o update
            this.teamService.updateTeam(this.team).subscribe(
                (team: Team) => {
                    this.alertService.successAlert("Nome atualizado com sucesso");
                }
            );
        }
    }


    selectedFile !: any;
    base64 !: any;
    fd !: FormData;
    url!: any;
    onFileSelected(e: any): void {
        this.fd = new FormData()
        this.selectedFile = e.target.files[0];
        this.fd.append('file', this.selectedFile, this.selectedFile.name);
        let reader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            let file = e.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base = reader.result as string;
                this.base64 = base.split(",").pop();
                this.url = reader.result;
            };
        }

        this.teamService
            .updateImage(this.team.id, this.fd)
            .subscribe(
                (team: Team) => {
                    this.team = team;
                    this.alertService.successAlert(`Imagem atualizada com sucesso!`);
                },
                (error: any) => {
                    this.alertService.errorAlert("Imagem inválida!");
                }
            );
    }

}
