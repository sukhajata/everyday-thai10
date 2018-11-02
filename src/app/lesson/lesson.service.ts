import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
//import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { Lesson } from '../model/Lesson';
import { Slide } from '../model/Slide';
import { Media } from '../model/Media';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private lessonUrl = "https://sukhajata.com/api/lesson.php";

  constructor(
    private http: HttpClient
    //private tts: TextToSpeech,
    //private localNotifications: LocalNotifications
  ) { }

  getLesson(id: number): Observable<Lesson>{
    let params = new HttpParams().set('id', id.toString());
    return this.http.get<Lesson>(this.lessonUrl, { params: params });
  }

  getNotification(id): Observable<any> {
    let params = new HttpParams().set('lessonId', id);
    return this.http.get<any>("https://sukhajata.com/m/loadNotifications.php", { params: params });
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }


}
