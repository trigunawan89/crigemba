import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Page01Page } from './page01';

@NgModule({
  declarations: [
    Page01Page,
  ],
  imports: [
    IonicPageModule.forChild(Page01Page),
  ],
})
export class Page01PageModule {}
