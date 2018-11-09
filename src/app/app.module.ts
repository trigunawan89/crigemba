import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, ViewChild } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Slides, AlertController  } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Page01Page } from '../pages/page01/page01';
import { SummaryPage } from '../pages/summary/summary';
import { UploaddataPage } from '../pages/Uploaddata/Uploaddata';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// user provider

import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { DatePipe } from '@angular/common';
import { environment } from '../environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SocialSharing } from '@ionic-native/social-sharing';
import { EmailComposer } from '@ionic-native/email-composer';
import { Base64 } from '@ionic-native/base64';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

//user page
import { AddDataPage } from '../pages/add-data/add-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AddDataPage,
    SummaryPage,
    Page01Page,
    UploaddataPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AddDataPage,
    SummaryPage,
    Page01Page,
    UploaddataPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast,
    File,
    Transfer,
    FilePath,
    Camera,
    DatePipe,
    ViewChild,
    Slides,
    SocialSharing,
    EmailComposer,
    Base64,
    SQLitePorter,
    AlertController,
    UniqueDeviceID
  ]
})
export class AppModule {}
