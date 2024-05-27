import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Task } from 'src/app/models/class/task';
import { AlertService } from 'src/app/services/alert.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

declare var google: any;
declare var gapi: any;

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
})
export class AttachmentsComponent implements OnInit {
  @Input() task!: Task;

  private CLIENT_ID = '526993530074-1f56cdf8k5lpht66el9gv7dvm27q4h1e.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyBBaeGOB8Bij0Py3MkYSNqwvq-k9J0VOjw';
  private SCOPES = 'https://www.googleapis.com/auth/drive.file';
  private DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

  constructor(
    private alert: AlertService,
    private taskService: TaskService,
    private userService: UserService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    console.log(this.task);
    this.loadGoogleAPI();
  }

  loadGoogleAPI() {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: this.API_KEY,
        discoveryDocs: this.DISCOVERY_DOCS,
      }).then(() => {
        this.initializeGsi();
      }).catch((error: any) => {
        console.error('Erro ao inicializar a API do Google:', error);
      });
    });
  }

  initializeGsi() {
    google.accounts.id.initialize({
      client_id: this.CLIENT_ID,
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.prompt();
  }

  handleCredentialResponse(response: any) {
    const credential = response.credential;
    gapi.auth2.init({
      client_id: this.CLIENT_ID
    }).then((authInstance: any) => {
      authInstance.signIn().then(() => {
        this.openPicker();
      });
    }).catch((error: any) => {
      console.error('Erro ao autenticar o usuário:', error);
    });
  }

  openPicker() {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      const oauthToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
      const picker = new google.picker.PickerBuilder()
        .addView(google.picker.ViewId.DOCS)
        .setOAuthToken(oauthToken)
        .setDeveloperKey(this.API_KEY)
        .setCallback(this.pickerCallback)
        .build();
      picker.setVisible(true);
    }
  }

  pickerCallback(data: any) {
    if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
      const fileId = data[google.picker.Response.DOCUMENTS][0][google.picker.Document.ID];
      console.log('Arquivo selecionado:', fileId);
    }
  }
  
  onFileSelected(e: any): void {
    const selectedFile = e.target.files[0];
    console.log(selectedFile, 'file');
    
    const fd: FormData = new FormData();
    fd.append('file', selectedFile, selectedFile.name);

    this.taskService.uploadFile(fd, this.task.id!, this.userService.getLogged().id!).subscribe((task: Task) => {
      this.task = task;
      this.alert.successAlert(this.translate.instant("alerts.success.uploadFile") + task.name + "!");
    });
  }


  fileRemoveHandler(file: any): void {
    this.taskService.removeFile(this.task.id, file.id).subscribe((task: Task) => {
      this.task = task;
    });
  }
}
