import { Component } from '@angular/core';
import { faUser, faEnvelope,
    faEarthAmericas, faKey, faAngleDown, faToggleOff,
     faPencil, faToggleOn, faCircleUser,
    faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { PersonalizationService } from 'src/app/services/personalization.service';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

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

  primaryColor: string;
  secondColor: string;

  toogleOn: boolean = true;
  buttonEdit: boolean = true;
  buttonConfirm: boolean = false;
  contentEditable: boolean = false;
  click: string = 'initial';
  validInput: boolean = true;

  form !: FormGroup;

  itemsList = [
    { id: 'email', icon: faEnvelope, option: 'E-mail', formControlName: 'email'},
    { id: 'name', icon: faUser, option: 'Nome', formControlName: 'name'},
    { id: 'location', icon: faEarthAmericas, option: 'Localização', formControlName: 'location'},
    { id: 'description', icon: faEarthAmericas, option: 'Descrição', formControlName: 'description'}
  ];

  tooglesList = [
    {text: "Mostrar gráficos de desempenho para equipe", icon: faToggleOff},
    {text: "Deixar meu perfil visível a membros da equipe", icon: faToggleOff}
  ];

  constructor(
    private personalization : PersonalizationService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ){
    this.primaryColor = personalization.getPrimaryColor();
    this.secondColor = personalization.getSecondColor();
    
    this.logged = userService.getLogged();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({

      email: [this.logged.email],
      name: [`${this.logged.firstName} ${this.logged.lastName}`],
      location: [this.logged.location],
      description: [this.logged.description]

    })
  }

  // Alter the status of toogle
  toogleCharts(item :number): void{
    if(this.tooglesList[item].icon == faToggleOff){
      this.tooglesList[item].icon = faToggleOn;
    }else {
      this.tooglesList[item].icon = faToggleOff;
    }
  }

  clickOption(id: string): void{
    this.click = id;
    this.contentEditable = !this.contentEditable
  }

    onChange(): void {
    console.log(this.contentEditable)
    if(!this.contentEditable){
      this.contentEditable = !this.contentEditable;
    }
  }

  passwordValidation(): void {
    // if((this.itemsList[0].placeholder === '') ||
    //   (this.itemsList[1].placeholder === '')){
    //     this.validInput = false;
    // }
  }

  closeModal():void {
    this.validInput = true;
  }

  onSubmit(): void {

    this.organizeValues();

    this.userService
      .update(this.logged)
      .subscribe((user: User) => {
        console.log(user);
      })
    
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

}