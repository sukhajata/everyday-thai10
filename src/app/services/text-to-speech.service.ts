import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  constructor() { }

  escape_quotes(str) {
    return str.replace(/\'/g,"\\'");
  }

  speak(txt: String) {
    txt = this.escape_quotes(txt);
    console.log("Speaking: " + txt);
    /*this.tts.speak({
      text: txt,
      locale: 'en-US',
      rate: 0.7
    })
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  */
  }
  
  speakButton(text, button) {
    var highlighted = document.getElementsByClassName("frame-highlight");
    if( highlighted.length > 0) {
      highlighted[0].className = "frame";
    }
    button.parentElement.className = "frame-highlight";
    this.speak(text); 
  }


}
