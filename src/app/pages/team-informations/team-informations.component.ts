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
import { TranslateService } from '@ngx-translate/core';


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

    query !: string;
    notCreator: boolean = true;
    
    constructor(
        private route: ActivatedRoute,
        private teamService: TeamService,
        private alertService: AlertService,
        private groupService: GroupService,
        private userService: UserService,
        private translate : TranslateService
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

            this.notCreator = !(this.team.creator.id === this.userService.getLogged().id);
            
            //Graphics
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text');
            this.basicData = {
                labels: [this.translate.instant("pages.team-informations.NaoIniciadas"), this.translate.instant("pages.team-informations.EmAndamento"), this.translate.instant("pages.team-informations.Concluidas")],
                datasets: [
                  {
                    // label: this.translate.instant('pages.user-informations.tasksPerformance'),
                    data: this.team.tasksPerformances,
                    backgroundColor: this.userService.getLogged().personalization?.theme == 1 ? ["#FA7070", "#F3CA52", "#A1C398"] : ["#ffe2dd", "#fdecc8", "#dbeddb"],
                    borderColor: ["#d93b3b", "#d9bf3b", "#70d93b"],
                    borderWidth: 1,
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

            if (this.team.users!.length > 1 && this.menuItems.length < 2 && !this.notCreator) {
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
        this.alertService.successAlert(this.translate.instant("alerts.success.invitationCodeCopied"));
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

    deleteUser !: boolean
    userToDelete !: User

    openModalDeleteUser(event: any) {
        this.userToDelete = event
        this.deleteUser = true;
    }

    openModalCreateGroup() {
        this.createGroupModal = true
    }

    createGroup(group: Group): void {
        this.groupService
            .create(group)
            .subscribe((group: Group) => {
                this.alertService.successAlert(this.translate.instant("alerts.success.groupCreated"));
                console.log(group.name);

                this.switchCreateViewGroup();
                this.getTeam()
            },
                e => {
                    if (group.name == null) {
                        this.alertService.errorAlert(this.translate.instant("alerts.error.needGroupName"))
                    } else {
                        this.alertService.errorAlert(this.translate.instant("alerts.error.creategroup"))
                    }
                });
    }

    switchCreateViewGroup(): void {
        this.createGroupModal = !this.createGroupModal;
    }

    deleteGroup(event : Group){
        this.groupService.delete(event).subscribe((group: Group) => {
            this.alertService.successAlert(this.translate.instant("alerts.success.group_deleted"));
            this.team.groups.splice(this.team.groups.indexOf(event),1)
        },
            (e) => {
                this.alertService.errorAlert(this.translate.instant("alerts.error.delete_group"));
        })
    }

    editDescription: boolean = false;
    changeEditDescription(): void {
        if(this.isCreator()){
            this.editDescription = !this.editDescription
        
            if (!this.editDescription) {
                this.teamService.updateTeam(this.team).subscribe(
                    (team: Team) => {
                        this.alertService.successAlert(this.translate.instant("alerts.success.descriptionUpdated"));
                    });
                }
        }
    }

    inputEditName: boolean = false;
    newName: string = "";
    editName(): void {
        if(this.isCreator()){
            this.inputEditName = !this.inputEditName;
            if (this.inputEditName) {
                this.newName = this.team.name;
            } else {
                    //Validação
                    if (this.newName.length < 3 || this.newName.length > 30) {
                        this.alertService.notificationAlert(this.translate.instant("alerts.notification.invalidName"));
                        this.newName = "";
                        return;
                    }
                this.team.name = this.newName;
                //Caso a validação seja feita é feito o update
                this.teamService.updateTeam(this.team).subscribe(
                    (team: Team) => {
                        this.alertService.successAlert(this.translate.instant("alerts.success.nameUpdated"));
                    }
                );
            }
        }
    }

    returnMemberOrMembers(): string {
        if (this.team.users!.length > 1) {
            return "members"
        } else {
            return "member"
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
                    this.alertService.successAlert(this.translate.instant("alerts.success.image_update_success"));
                },
                (error: any) => {
                    this.alertService.errorAlert(this.translate.instant("alerts.error.invalidImage_update"));
                }
            );
    }

    isCreator(): boolean {
        return this.team.creator.id === this.userService.getLogged().id;
    }

}
