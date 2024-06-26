import { Component } from '@angular/core';
import {
  faUser, faEnvelope,
  faEarthAmericas, faKey, faAngleDown, faToggleOff,
  faPencil, faToggleOn, faCircleUser,
  faPenToSquare,
  faTShirt
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User, UserKind } from 'src/app/models/class/user';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { Message } from 'src/app/models/class/message';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  logged !: User;

  faUser = faUser;
  faEnvelope = faEnvelope;
  faEarthAmericas = faEarthAmericas;
  faKey = faKey;
  faAngleDown = faAngleDown;
  faToggleOff = faToggleOff;
  faToggleOn = faToggleOn;
  faPencil = faPencil;
  faCircleUser = faCircleUser;
  faPenToSquare = faPenToSquare;

  toogleOn: boolean = true;
  buttonEdit: boolean = true;
  buttonConfirm: boolean = false;
  contentEditable: boolean = false;
  click: string = 'initial';
  validInput: boolean = true;

  form !: FormGroup;

  selectedFile !: any;

  itemsList = [
    { id: 'email', icon: faEnvelope, option: 'E-mail', formControlName: 'email' },
    { id: 'name', icon: faUser, option: 'Nome', formControlName: 'name' },
    { id: 'location', icon: faEarthAmericas, option: 'Localização', formControlName: 'location' },
    { id: 'description', icon: faEarthAmericas, option: 'Descrição', formControlName: 'description' }
  ];

  tooglesList !: any[];
  // visible: this.logged.userKind === UserKind.GOOGLE
  // visible: this.logged.userKind === UserKind.GOOGLE
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alert: AlertService,
    private translate: TranslateService,
    private router: Router
  ) {
    this.logged = this.userService.getLogged();

  }

  ngOnInit(): void {
    this.tooglesList = [
      { id: 1, text: "Mostrar gráficos de desempenho para equipe", icon: faToggleOff, event: () => this.toogleCharts(), visible: true },
    ]
    if (this.logged.userKind === "GOOGLE") {
      this.tooglesList.push(
        { id: 3, text: "Sincronizar com Google Agenda", icon: faToggleOff, event: () => this.syncCalendar(), visible: this.logged.userKind === 'GOOGLE' },
      );
    }
    if (this.logged.userKind === "GOOGLE") {
      this.tooglesList.push(
        { id: 4, text: "Sincronizar com Google Drive", icon: faToggleOff, event: () => this.syncDrive(), visible: this.logged.userKind === 'GOOGLE' },
      );
    }
    if (this.logged.showCharts) {
      this.tooglesList[0].icon = faToggleOn;
    }

    if (this.logged.syncWithCalendar) {
      this.tooglesList[1].icon = faToggleOn;
    }
    if (this.logged.syncWithDrive) {
      this.tooglesList[2].icon = faToggleOn;
    }


    this.form = this.formBuilder.group({

      email: [this.logged.email],
      name: [`${this.logged.firstName} ${this.logged.lastName}`],
      location: [this.logged.location],
      description: [this.logged.description]

    })


  }


  syncCalendar(): void {
    if (!this.logged.syncWithCalendar) {
      this.logged.syncWithCalendar = true;
      window.location.href = `http://localhost:7777/calendar/authorize`;
      this.tooglesList[1].icon = faToggleOn;
    } else {
      this.logged.syncWithCalendar = false;
      this.userService.a().subscribe();
      this.tooglesList[1].icon = faToggleOff;
    }
  }

  syncDrive() {
    if (!this.logged.syncWithDrive) {
      this.logged.syncWithDrive = true;
      window.location.href = `http://localhost:7777/drive/authorize`;
      this.tooglesList[2].icon = faToggleOn;
    } else {
      this.logged.syncWithDrive = false;
      this.userService.drive().subscribe();
      this.tooglesList[2].icon = faToggleOff;
    }
  }

  getLoggedUser(): void {
    this.logged = this.userService.getLogged();
  }

  // Alter the status of toggle
  toogleCharts(): void {
    this.userService.patchShowCharts(this.logged.id!).subscribe((user: User) => {
      this.alert.successAlert(this.translate.instant('alerts.success.update_success'))
      this.logged = user;
      this.tooglesList[0].icon = this.tooglesList[0].icon === faToggleOff ? faToggleOn : faToggleOff;

    });
  }

  clickOption(id: string): void {
    this.click = id;
    this.contentEditable = !this.contentEditable
  }

  onChange(): void {
    if (!this.contentEditable) {
      this.contentEditable = !this.contentEditable;
    }
  }

  closeModal(): void {
    this.validInput = true;
  }

  onSubmit(): void {

    this.organizeValues();

    this.userService
      .update(this.logged)
      .subscribe(() => {
        this.alert.successAlert(this.translate.instant('alerts.success.update_success'))
      },
        e => {
          console.log(e);

          this.alert.errorAlert(this.translate.instant('alerts.success.update_error'))
        }
      )

  }

  organizeValues(): void {
    const formValue = this.form.value;
    const firstName = formValue.name.split(' ')[0];
    const lastName = formValue.name.slice(firstName.length + 1);

    this.logged = {
      ...this.logged,
      email: formValue.email,
      firstName: firstName,
      lastName: lastName,
      description: formValue.description,
      location: formValue.location,
    };

  }

  onFileSelected(e: any): void {
    this.selectedFile = e.target.files[0]
    const fd: FormData = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);

    console.log(fd);

    this.userService
      .uploadImage(fd, this.logged.id!)
      .subscribe(() => {
        this.alert.successAlert(this.translate.instant('alerts.success.image_update_success'));
        this.updateLoggedUser();
      });
  }

  updateLoggedUser(): void {
    this.userService
      .getOneById(this.logged.id!)
      .subscribe((user: User) => {
        this.logged = user;
        this.userService.updateLoggedUser(user);
      })
  }


}