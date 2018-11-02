import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { LessonPage } from './lesson.page';
import { LessonService } from './lesson.service';

import { AudioPromptComponent } from './components/audio-prompt/audio-prompt.component';

const routes: Routes = [
  {
    path: '',
    component: LessonPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  declarations: [
    LessonPage,
    AudioPromptComponent
  ],
  providers: [HttpClientModule, LessonService]
})
export class LessonPageModule {}
