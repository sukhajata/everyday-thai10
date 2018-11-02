import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Lesson } from '../model/Lesson';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private lessonUrl = "https://sukhajata.com/api/home.php?userId=680";

  constructor(private http: HttpClient) { }

  getLessons(): Observable<Lesson[]>{
    return this.http.get<Lesson[]>(this.lessonUrl);
  }
}
