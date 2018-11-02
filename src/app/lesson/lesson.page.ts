import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Input } from '@ionic/angular';
import { Router } from '@angular/router';

import { LessonService } from './lesson.service';
import { TextToSpeechService } from '../services/text-to-speech.service';
import { Lesson } from '../model/Lesson';
import { Slide } from '../model/Slide';
import { Media } from '../model/Media';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.page.html',
  styleUrls: ['./lesson.page.scss'],
})
export class LessonPage implements OnInit {
  translateTarget: string = "";
  translateComplete: boolean = false;
  translateCurrentOrder: number = 1;

  writing: string = "";
  writingMatch = false;
  private sub: any;
  audioUrl = "https://sukhajata.com/audio/";
  imageUrl = "https://sukhajata.com/images/";
  wrongCount = 0;
  lesson: Lesson;
  slides: Slide[];
  medias: Media[];
  medias2: Media[];
  slideScore: Array<number>;
  currentSlide: Slide;
  currentOrder: number = 0;
  correctCount = 0;
  targetText = "";
  selectedId = 0;
  selectedThai: Media;
  selectedEnglish: Media;
  selectedImage: Media;

  constructor(
    private route: ActivatedRoute, 
    private lessonService: LessonService,
    private textToSpeechService: TextToSpeechService,
    private toastController: ToastController,
    private router: Router,
    private storage: Storage) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      var id = +params['id'];
      this.getLesson(id);
    });

    this.storage.get('userId')
      .then(data => {
        if (!data) {
          this.storage.set('userId', '680');
        }
      });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  checkText(correct) {
    if (this.writing.trim().toLowerCase() == correct.trim().toLowerCase()) {
     this.writingMatch = true;
    }
  }

  getLesson(id: number): void {
    this.lessonService.getLesson(id)
      .subscribe((data) => {
        this.lesson = data;
        this.slides = [];
        //convert object to array
        Object.keys(data.Slides).forEach((i) => {
          this.slides.push(data.Slides[i]);
        });
        this.currentOrder = 1;
        this.slideScore = [];
        for (var i = 0; i < this.slides.length; i++) {
          this.slideScore.push(0);
        }
        this.getSlide();
      });
  }

  getSlide(): void {
    if (this.slides[this.currentOrder - 1]) {
      this.currentSlide = this.slides[this.currentOrder - 1];
      this.medias = [];
      Object.keys(this.currentSlide.Medias).forEach((i) => {
        this.currentSlide.Medias[i].Visible = true;
        this.medias.push(this.currentSlide.Medias[i]);
      });
      //clone array and shuffle
      this.medias2 = JSON.parse(JSON.stringify(this.medias))
      this.medias2 = this.lessonService.shuffle(this.medias2);
      //for (var media of this.currentSlide.Medias) {
       // this.medias.push(media);
      //}

      // console.log(this.currentSlide);
    }
  }


  selectWrong(media) {
    media.Selected = true;
    this.wrongCount = this.wrongCount + 1;
  }
  
  selectRight(media) {
    media.Selected = true;
    this.moveNext();
  }

  loadTotals(errors: number) {
    //load totals
    this.router.navigate(['/totals', { lessonId: +this.lesson.Id, errors: errors }]);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'ลองอีกครั้ง',
      position: 'middle',
      duration: 600
    });
    toast.present();
  }

  loadNotification() {
    this.lessonService.getNotification(this.lesson.Id)
      .subscribe(
        data => {
          //console.log(data);
          /*this.localNotifications.cancel(1);
        
          if (data.text_english != "") {
            this.localNotifications.schedule({
              id: 1,
              title: data.text_english,
              text: data.text_thai,
              trigger:  {at: new Date(new Date().getTime() + 3600)},
              icon: 'https://sukhajata.com/images/logo.png',
              launch: true
            });
          }
          */
        }
      );

  }

  speak(txt: String) {
    this.textToSpeechService.speak(txt);
  }

  moveNextCheat() {
    this.wrongCount++;
    this.writingMatch = true;
  }

  moveNext(): void {
    if (this.lesson.Id == "44") {
      //moveNextTest();
    } else {
      if (this.wrongCount > 0) {
        this.slideScore[this.currentOrder - 1] = -1;
      } else {
        this.slideScore[this.currentOrder - 1] = 1;
      }
      
      this.currentOrder = this.currentOrder + 1;
  
      var slideCount = parseInt(this.lesson.SlideCount);
      
      if (this.currentOrder > slideCount) {
        //finished
        var errors = 0;
        for (var k = 0; k < slideCount; k++) {
          if (this.slideScore[k] == 0) {
            errors++;
          }
        }
        this.loadTotals(errors);
  
        //insert local db
        //insert_totals(lessonData.Id, errors)
    
        //set up notification reminder
        this.loadNotification();
  
      } else {
        //this.currentOrder = 1;
        this.wrongCount = 0;
        this.correctCount = 0;
        this.targetText = "";
        this.selectedId = 0;
        this.selectedThai = null;
        this.selectedEnglish = null;
        this.selectedImage = null;
        this.translateTarget = "";
        this.translateComplete = false;
        this.translateCurrentOrder = 1;

        this.getSlide();
      }
    }
  }

  selectEnglishText(media: Media) {
    this.textToSpeechService.speak(media.English);

    //check if something else is already selected
    if (this.selectedEnglish != null && media != this.selectedEnglish) {
      //deselect
      this.selectedEnglish.Selected = false;
    }

    this.selectedEnglish = media;
    media.Selected = true;

    if (this.selectedThai != null) {
      //check if it's a match
      if (this.selectedEnglish.Id == this.selectedThai.Id) {
        //correct
        this.correctCount++;
        if (this.correctCount == 2) {
          this.moveNext();
        }
        //remove pair
        this.selectedEnglish.Visible = false;
        this.selectedThai.Visible = false;
      } else {
        //wrong
        this.wrongCount++;
        this.presentToast();
        //deselect both
        this.selectedEnglish.Selected = false;
        this.selectedThai.Selected = false;
      }

      //reset
      this.selectedEnglish = null;
      this.selectedThai = null;
    }

  }

  selectEnglishText2(media: Media) {
    this.textToSpeechService.speak(media.English);

    //check if something else is already selected
    if (this.selectedEnglish != null && media != this.selectedEnglish) {
      //deselect
      this.selectedEnglish.Selected = false;
    }

    this.selectedEnglish = media;
    media.Selected = true;

    if (this.selectedImage != null) {
      //check if it's a match
      if (this.selectedEnglish.Id == this.selectedImage.Id) {
        //correct
        this.correctCount++;
        if (this.correctCount == 2) {
          this.moveNext();
        }
        //remove pair
        this.selectedEnglish.Visible = false;
        this.selectedImage.Visible = false;
      } else {
        //wrong
        this.wrongCount++;
        this.presentToast();
        //deselect both
        this.selectedEnglish.Selected = false;
        this.selectedImage.Selected = false;
      }

      //reset
      this.selectedEnglish = null;
      this.selectedImage = null;
    }

  }

  selectThaiText(media: Media) {

    //check if something else is already selected
    if (this.selectedThai != null && media != this.selectedThai) {
      //deselect
      this.selectedThai.Selected = false;
    }

    this.selectedThai = media;
    media.Selected = true;

    if (this.selectedEnglish != null) {
      //check if it's a match
      if (this.selectedEnglish.Id == this.selectedThai.Id) {
        //correct
        this.correctCount++;
        if (this.correctCount == 2) {
          this.moveNext();
        }
        //remove pair
        this.selectedEnglish.Visible = false;
        this.selectedThai.Visible = false;
      } else {
        //wrong
        this.wrongCount++;
        this.presentToast();
        //deselect both
        this.selectedEnglish.Selected = false;
        this.selectedThai.Selected = false;
      }

      //reset
      this.selectedEnglish = null;
      this.selectedThai = null;
    }

  }

  selectImage(media: Media) {
      //check if something else is already selected
      if (this.selectedImage != null && media != this.selectedImage) {
        //deselect
        this.selectedImage.Selected = false;
      }
  
      this.selectedImage = media;
      media.Selected = true;
  
      if (this.selectedEnglish != null) {
        //check if it's a match
        if (this.selectedEnglish.Id == this.selectedImage.Id) {
          //correct
          this.correctCount++;
          if (this.correctCount == 2) {
            this.moveNext();
          }
          //remove pair
          this.selectedEnglish.Visible = false;
          this.selectedImage.Visible = false;
        } else {
          //wrong
          this.wrongCount++;
          this.presentToast();
          //deselect both
          this.selectedEnglish.Selected = false;
          this.selectedImage.Selected = false;
        }
  
        //reset
        this.selectedEnglish = null;
        this.selectedImage = null;
      }
  }

  selectiveToLowerCase(text){
    if (text.indexOf("I ") == 0 || text.indexOf("I'") == 0) {
      //capitalize first letter
      text = text.charAt(0).toUpperCase() + text.slice(1);
    } else {
      //lower case
      text = text.toLowerCase();
    }

    return text;
  }

  selectTranslate (media) {
      
    if (media.MediaOrder == this.translateCurrentOrder || 
      media.English == this.medias[this.translateCurrentOrder - 1].English) {
      //correct
      var text = this.selectiveToLowerCase(media.English);
      if (this.translateTarget == "") {
        //capitalize first letter
        text = text.charAt(0).toUpperCase() + text.slice(1);
      }
      this.translateTarget = this.translateTarget.concat(" ", text);

      media.Visible = false;
      this.translateCurrentOrder++;
      
      //reset mistakes
      for (let mm of this.medias2) {
        mm.Selected = false;
      }
          
      if (this.translateCurrentOrder > +this.currentSlide.MediaCount) {
        //finished
        this.translateComplete = true;
        
        for (let mm of this.medias2) {
          mm.Visible = false;
        }
        
        //update display to original including punctuation
        this.translateTarget = this.currentSlide.LabelEnglish;
        
      } else {
        //not finished
        var next = this.medias[this.translateCurrentOrder - 1].English;
        if (next) {
          this.speak(next); 
        } 
        
      }
    } else {
      media.Selected = true;
      this.wrongCount++;
    }
  }

}
