import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Slide } from '../../../model/Slide';
import { TextToSpeechService } from '../../../services/text-to-speech.service';

@Component({
  selector: 'app-audio-prompt',
  templateUrl: './audio-prompt.component.html',
  styleUrls: ['./audio-prompt.component.scss']
})
export class AudioPromptComponent implements OnInit {
  @Input() hasAudio: Boolean;
  @Input() audioUrl: String;
  @Input() labelEnglish: String;
  @Input() labelThai: String;
  @Input() textToSpeak: Slide;

  constructor(private textToSpeechService: TextToSpeechService) { }

  ngOnInit() {
  }

  speak(textToSpeak: String) {
    this.textToSpeechService.speak(textToSpeak);
  }

}
