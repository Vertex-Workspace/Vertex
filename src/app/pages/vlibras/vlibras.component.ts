import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-vlibras',
  templateUrl: './vlibras.component.html',
  styleUrls: ['./vlibras.component.scss']
})
export class VlibrasComponent {

  constructor( private renderer: Renderer2 ) {}

  ngAfterViewInit() {
    this.loadVLibrasPlugin();
  }

  loadVLibrasPlugin() {
    const vLibrasScript = this.renderer.createElement('script');
    vLibrasScript.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    vLibrasScript.onload = () => {
      
      //@ts-ignore
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    };
    this.renderer.appendChild(document.body, vLibrasScript);
  }


  

}
