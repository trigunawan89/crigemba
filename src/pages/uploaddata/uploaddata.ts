import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Slides } from 'ionic-angular';


//user provider
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { DatePipe } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database'
import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database-deprecated";
import { HomePage } from '../home/home';
import firebase from 'firebase';
import { SocialSharing } from '@ionic-native/social-sharing';
import { EmailComposer } from '@ionic-native/email-composer';
import * as papa from 'papaparse';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';


declare var cordova: any;

@Component({
  selector: 'page-uploaddata',
  templateUrl: 'uploaddata.html',
})
export class UploaddataPage {
  t_crigemba: any;
  uid: any;
  date: any;
  filename ; any;
  
  constructor( public datepipe: DatePipe,private uniqueDeviceID: UniqueDeviceID, private sqlitePorter: SQLitePorter, private file: File, private filePath: FilePath, private platform: Platform, private emailComposer: EmailComposer, private socialSharing: SocialSharing, public toastCtrl: ToastController,private sqlite: SQLite,public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) 
  {
      this.getData();
      this.date = this.datepipe.transform(Date(), 'yyyy-MM-dd');
      this.uid = this.uniqueDeviceID.get();
      this.filename = 'GembaFile_'+this.uid+this.date;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UploaddataPage');
  }
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }  

  downloadCSV() {
    let csv = papa.unparse({
      fields: null,
      data: this.t_crigemba
    });
    
    //var compressedJSON = JSONC.compress( JSON.stringify(this.t_crigemba) );

    var blob = new Blob([csv]);
    //this.file.writeFile(this.file.dataDirectory, 'test.csv', 'hello,world,', {replace: true})
    this.file.writeFile(cordova.file.externalRootDirectory + '/Download/', this.filename, JSON.stringify(this.t_crigemba), {replace:true});
    //this.file.writeFile(cordova.file.externalRootDirectory + '/Download/', 'Gembafile.json', JSON.stringify(this.t_crigemba), {replace:true});
    //this.presentToast( cordova.file.externalRootDirectory);
    //JSON.stringify(this.t_crigemba);
    //this.presentToast('Data Downloaded');
    this.shareFile();
  }

  shareFile() { 
    let imageName = "Gembafile.json";
    const ROOT_DIRECTORY = cordova.file.externalRootDirectory;
    const downloadFolderName = 'Download';
    
    //Create a folder in memory location
    this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
      .then((entries) => {
 
        //Common sharing event will open all available application to share
        this.socialSharing.share("Message","Subject", ROOT_DIRECTORY + downloadFolderName + "/" + imageName, imageName)
        .then((entries) => {
          console.log('success ' + JSON.stringify(entries));
        })
        .catch((error) => {
          alert('error ' + JSON.stringify(error));
        });
      })
      .catch((error) => {
        alert('error ' + JSON.stringify(error));
      });
  }


  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM t_crigemba WHERE location <> "" ORDER BY rowid DESC', {})
      .then(res => {     
        this.t_crigemba = [];
        for(var i=0; i<res.rows.length; i++) {
          console.log('base64:'+res.rows.item(i).image1base64);
          this.t_crigemba.push({rowid:res.rows.item(i).rowid,site:res.rows.item(i).site,location:res.rows.item(i).location,description:res.rows.item(i).description,score:res.rows.item(i).score,image1:res.rows.item(i).image1,image2:res.rows.item(i).image2,image3:res.rows.item(i).image3,image4:res.rows.item(i).image4,image5:res.rows.item(i).image5,image1base64:res.rows.item(i).image1base64,image2base64:res.rows.item(i).image2base64,image3base64:res.rows.item(i).image3base64,image4base64:res.rows.item(i).image4base64,image5base64:res.rows.item(i).image5base64,date:res.rows.item(i).date})
        }
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
   // this.presentToast('Data Loaded');
    //this.downloadCSV();
    

    //this.sqlitePorter.exportDbToSql(db);
  }

}
