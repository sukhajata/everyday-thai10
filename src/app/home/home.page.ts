import { Component } from '@angular/core';
import { Lesson } from '../model/Lesson';
import { Router } from '@angular/router';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lessons: Lesson[];

  constructor(
    private homeService: HomeService, 
    private router: Router) { }

  ngOnInit() {
    this.getLessons();
  }

  launchLesson(id: string): void {
    this.router.navigate(['/lesson', { id: id }]);
  }

  getLessons(): void {
    this.homeService.getLessons()
      .subscribe(lessons => this.lessons = lessons);
  }

}
