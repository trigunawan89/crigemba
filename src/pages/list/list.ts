import { Component, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Slides } from 'ionic-angular';

//user provider
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { DatePipe } from '@angular/common';

declare var cordova: any;

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  t_crigemba: any = [];
  site: any;
  location : any;
  description : any;
  score : any;
  image: any;
  date: any;
  scorepath:any;

  defaultPath:any;

  constructor(public datepipe: DatePipe, public navCtrl: NavController, private sqlite: SQLite, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
      this.getData();
      this.defaultPath = cordova.file.dataDirectory+'undefined';
      console.log(this.defaultPath);
  }

  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS t_crigemba(rowid INTEGER PRIMARY KEY, site TEXT, location TEXT, description TEXT, score TEXT, image TEXT, date TEXT)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM t_crigemba WHERE location <> "" ORDER BY rowid DESC', {})
      .then(res => {
        this.t_crigemba = [];
        for(var i=0; i<res.rows.length; i++) {
          this.t_crigemba.push({rowid:res.rows.item(i).rowid,site:res.rows.item(i).site,location:res.rows.item(i).location,description:res.rows.item(i).description,score:res.rows.item(i).score,image1:res.rows.item(i).image1,image2:res.rows.item(i).image2,image3:res.rows.item(i).image3,image4:res.rows.item(i).image4,image5:res.rows.item(i).image5,date:res.rows.item(i).date})
        }
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  public pathForScore(score) {
    if (score == 1) {  this.scorepath = "assets/img/img1.png"
      //console.log(this.scorepath);
      return this.scorepath;
    }
    if (score == 2) {  this.scorepath = "assets/img/img2.png"
    //console.log(this.scorepath);
      return this.scorepath;
    }
    if (score == 3) {  this.scorepath = "assets/img/img3.png"
    //console.log(this.scorepath);
      return this.scorepath;
    }
    if (score == 4) {  this.scorepath = "assets/img/img4.png"
    //console.log(this.scorepath);
      return this.scorepath;
    }
    if (score == 5) {  this.scorepath = "assets/img/img5.png"
    //console.log(this.scorepath);
      return this.scorepath;
    }
    if (score == 6) {  this.scorepath = "assets/img/img6.png"
    //log(this.scorepath);
      return this.scorepath;
    }
  }

  deleteData(site) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM t_crigemba WHERE site=?', [site])
      .then(res => {
        console.log(res);
        this.getData();
      })
      .catch(e => console.log(e));
      
    }).catch(e => console.log(e));
  }

  public checkPicture(img) {
    if (img.length === cordova.file.dataDirectory.length ) {     
      return 0;      
    } else {
      return 1;
    }
  }

}
