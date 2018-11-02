import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient ) { }

  getTotals(userId: Number, lessonId: Number, errors: Number): Observable<any> {
    let params = new HttpParams()
      .set('userId', userId.toString())
      .set('lessonId', lessonId.toString())
      .set('errors', errors.toString());

    return this.http.get( "https://sukhajata.com/api/totals.php", { params: params });

  }


}
