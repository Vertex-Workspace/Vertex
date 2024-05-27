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

  private clientId = '526993530074-1f56cdf8k5lpht66el9gv7dvm27q4h1e.apps.googleusercontent.com';
  private developerKey = 'AIzaSyBBaeGOB8Bij0Py3MkYSNqwvq-k9J0VOjw';
  private scope = ['https://www.googleapis.com/auth/drive.install', 'https://www.googleapis.com/auth/drive.appfolder', 'https://www.googleapis.com/auth/drive.appdata'];
  private pickerApiLoaded = false;
  private oauthToken?: string;

  constructor(
    private alert: AlertService,
    private taskService: TaskService,
    public userService: UserService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    console.log(this.task);
    this.loadPicker();
  }

  loadPicker(): void {
    gapi.load('client:picker', () => {
      this.onPickerApiLoad();
    });
  }

  onPickerApiLoad(): void {
    this.pickerApiLoaded = true;
  }

  openPicker(): void {
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.clientId,
      scope: this.scope.join(' '),
      callback: (tokenResponse: any) => {
        this.oauthToken = tokenResponse.access_token;
        this.createPicker();
      }
    });

    tokenClient.requestAccessToken();
  }

  // handleCredentialResponse(response: any): void {
  //   const tokenClient = google.accounts.oauth2.initTokenClient({
  //     client_id: this.clientId,
  //     scope: this.scope.join(' '),
  //     callback: (tokenResponse: any) => {
  //       this.oauthToken = tokenResponse.access_token;
  //       this.createPicker();
  //     }
  //   });

  //   tokenClient.requestAccessToken();
  // }

  createPicker(): void {
    if (this.pickerApiLoaded && this.oauthToken) {
      const picker = new google.picker.PickerBuilder()
        .addView(google.picker.ViewId.DOCS)
        .setOAuthToken(this.oauthToken)
        .setDeveloperKey(this.developerKey)
        .setCallback(this.pickerCallback.bind(this))
        .build();
      picker.setVisible(true);
    }
  }

  pickerCallback(data: any): void {
    if (data.action === google.picker.Action.PICKED && data.docs && data.docs.length > 0) {
      const fileId = data.docs[0].id;
      console.log(data);

      this.downloadFile(fileId);
    } else {
      console.error('Nenhum arquivo selecionado.');
    }
  }


  downloadFile(fileId: string): void {
    console.log(fileId);
  
    const metadataUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?fields=name,mimeType&key=AIzaSyBBaeGOB8Bij0Py3MkYSNqwvq-k9J0VOjw`;
  
    fetch(metadataUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.oauthToken}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao obter metadados do arquivo: ${response.status}`);
      }
      return response.json();
    })
    .then(metadata => {
      const fileName = metadata.name;
      const mimeType = metadata.mimeType;
  
      let fileUrl: string;
      let exportMimeType: string = '';
  
      
      if (mimeType.includes('application/vnd.google-apps')) {
        if (mimeType === 'application/vnd.google-apps.document') {
          exportMimeType = 'application/pdf'; 
        } else if (mimeType === 'application/vnd.google-apps.spreadsheet') {
          exportMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; 
        } else if (mimeType === 'application/vnd.google-apps.presentation') {
          exportMimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        } else {
          this.alert.errorAlert('Tipo de arquivo não suportado.');
        }
        fileUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=${encodeURIComponent(exportMimeType)}&key=AIzaSyBBaeGOB8Bij0Py3MkYSNqwvq-k9J0VOjw`;
      } else {
        fileUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=AIzaSyBBaeGOB8Bij0Py3MkYSNqwvq-k9J0VOjw`;
      }
  
      return fetch(fileUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.oauthToken}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro ao baixar o arquivo: ${response.status}`);
        }
        return response.blob().then(blob => ({ blob, exportMimeType, fileName }));
      });
    })
    .then(({ blob, exportMimeType, fileName }) => {
      const file = new File([blob], fileName, { type: exportMimeType || blob.type });
      const fd: FormData = new FormData();
      fd.append('file', file);
  
      console.log(file, 'file');
  
      this.taskService.uploadFile(fd, this.task.id!, this.userService.getLogged().id!).subscribe((task: Task) => {
        this.task = task;
        this.alert.successAlert(this.translate.instant("alerts.success.uploadFile") + task.name + "!");
      });
    })
    .catch(error => {
      console.error('Erro ao baixar o arquivo:', error);
    });
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
