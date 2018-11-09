import { Component, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Slides } from 'ionic-angular';

//user provider
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { DatePipe } from '@angular/common';
/**
 * Generated class for the SummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {

  @ViewChild(Slides) slides: Slides;

  t_crigemba: any = [];

  siteoption: any = [];
  site: any;

  locationoption: any = [];
  location: any;

  dateoption: any = [];
  date: any;

  green_score : any;
  yellow_score : any;
  orange_score : any;
  red_score : any;
  purple_score : any;
  grey_score : any;
 

  constructor(public datepipe: DatePipe, public navCtrl: NavController, private sqlite: SQLite, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
      this.getData();
  }

  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS t_crigemba(rowid INTEGER PRIMARY KEY, site TEXT, location TEXT, description TEXT, score TEXT, image TEXT, date TEXT)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT distinct site FROM t_crigemba ORDER BY site ASC', {})
      .then(res => {
        this.siteoption = [];
        for(var i=0; i<res.rows.length; i++) {
          this.siteoption.push({site:res.rows.item(i).site})
        }
      })
      .catch(e => console.log(e));
      db.executeSql('SELECT distinct location FROM t_crigemba ORDER BY location ASC', {})
      .then(res => {
        this.locationoption = [];
        for(var i=0; i<res.rows.length; i++) {
          this.locationoption.push({location:res.rows.item(i).location})
        }
      })
      .catch(e => console.log(e));
      db.executeSql('SELECT distinct date FROM t_crigemba ORDER BY date ASC', {})
      .then(res => {
        this.dateoption = [];
        for(var i=0; i<res.rows.length; i++) {
          this.dateoption.push({date:res.rows.item(i).date})
        }
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  getCurrentData() {

    this.green_score = null;
    this.yellow_score = null;
    this.orange_score = null;
    this.red_score = null;
    this.purple_score = null;
    this.grey_score = null;
    this.slides.slideTo(2);
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT count(score) as green_score FROM t_crigemba WHERE site=? and location=? and date =? and score ="1" GROUP BY site,location,date', [this.site,this.location,this.date])
        .then(res => {
          if(res.rows.length > 0) {
            this.green_score = res.rows.item(0).green_score;
          }
        }).catch(e => console.log(e));
      db.executeSql('SELECT count(score) as yellow_score FROM t_crigemba WHERE site=? and location=? and date =? and score ="2" GROUP BY site,location,date', [this.site,this.location,this.date])
        .then(res => {
          if(res.rows.length > 0) {
            this.yellow_score = res.rows.item(0).yellow_score;
          }
        }).catch(e => console.log(e));
      db.executeSql('SELECT count(score) as orange_score FROM t_crigemba WHERE site=? and location=? and date =? and score ="3" GROUP BY site,location,date', [this.site,this.location,this.date])
        .then(res => {
          if(res.rows.length > 0) {
            this.orange_score = res.rows.item(0).orange_score;
          }
        }).catch(e => console.log(e));
      db.executeSql('SELECT count(score) as red_score FROM t_crigemba WHERE site=? and location=? and date =? and score ="4" GROUP BY site,location,date', [this.site,this.location,this.date])
        .then(res => {
          if(res.rows.length > 0) {
            this.red_score = res.rows.item(0).red_score;
          }
        }).catch(e => console.log(e));
      db.executeSql('SELECT count(score) as purple_score FROM t_crigemba WHERE site=? and location=? and date =? and score ="5" GROUP BY site,location,date', [this.site,this.location,this.date])
        .then(res => {
          if(res.rows.length > 0) {
            this.purple_score = res.rows.item(0).purple_score;
          }
        }).catch(e => console.log(e));
      db.executeSql('SELECT count(score) as grey_score FROM t_crigemba WHERE site=? and location=? and date =? and score ="6" GROUP BY site,location,date', [this.site,this.location,this.date])
        .then(res => {
          if(res.rows.length > 0) {
            this.grey_score = res.rows.item(0).grey_score;
          }
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

}
