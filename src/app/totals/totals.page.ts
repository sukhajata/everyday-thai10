import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ExpandableComponent } from '../expandable/expandable.component';
import { ApiService } from '../services/api.service';
import { TextToSpeechService } from '../services/text-to-speech.service';
import { Totals } from '../model/Totals';
import { Word } from '../model/Word';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.page.html',
  styleUrls: ['./totals.page.scss'],
})
export class TotalsPage implements OnInit {

  totals: Totals;
  show: boolean = true;

  constructor(
    private apiService: ApiService,
    private textToSpeechService: TextToSpeechService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage) { }

  ngOnInit() {
    var sub = this.route.params
      .subscribe(params => {
        var lessonId = +params['lessonId'];
        var errors = +params['errors'];
        this.storage.get('userId')
          .then((userId)=> {
             this.getTotals(+userId, lessonId, errors);
          });
      });

   
  }

  getTotals(userId: Number, lessonId: Number, errors: Number) {
    this.apiService.getTotals(userId, lessonId, errors)
      .subscribe( data => {
        this.totals = data;
        //this.totals.Words = [];
        //convert object to array
        //Object.keys(data.Words).forEach((i) => {
         // this.totals.Words.push(data.Words[i]);
        //});
      });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  speak(text: String) {
    this.textToSpeechService.speak(text);
  }

}
