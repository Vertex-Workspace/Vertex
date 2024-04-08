import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextSpeechService {

  private synth: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance;

  constructor() {
    if (!('speechSynthesis' in window)) {
      console.error('API SpeechSynthesis não está disponível neste navegador.');
    }
    this.synth = window.speechSynthesis;
    this.utterance = new SpeechSynthesisUtterance();
  }

  public canSpeak: boolean = false;
  speak(text: string) {
    this.utterance.text = text;
    this.synth.speak(this.utterance);
  }

  stop() {
    if (this.synth.speaking) {
      this.synth.cancel();
      // this.synth.pause();
    }
  }
}
