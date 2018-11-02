import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TotalsPage } from './totals.page';
import { ExpandableComponent } from '../expandable/expandable.component';
import { AppModule } from '../app.module';

const routes: Routes = [
  {
    path: '',
    component: TotalsPage
  }
];

@NgModule({
  declarations: [TotalsPage, ExpandableComponent],
  exports: [ExpandableComponent],
  imports: [
    //AppModule,
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  
})
export class TotalsPageModule {}
