import { Component, ViewChild } from '@angular/core';
import { NavController,NavParams, ActionSheetController, ToastController, Platform, LoadingController, Slides } from 'ionic-angular';

//user provider
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { DatePipe } from '@angular/common';

// user pages
import { AddDataPage } from '../add-data/add-data';
import { ListPage } from '../list/list';
import { HomePage } from '../home/home';
import { Base64 } from '@ionic-native/base64';

declare var cordova: any;


@Component({
  selector: 'page-page01',
  templateUrl: 'page01.html',
})
export class Page01Page {

  @ViewChild(Slides) slides: Slides;

  rowid:any;
  t_crigemba: any = [];
  site: any;
  location : any;
  description : any;
  score : any;
  image : any;
  image1: any;
  image2: any;
  image3: any;
  imagepath: any;
  date: any;
  scoreOption: Array<string> = ['Best Practice (Green)', 'CAR Need Refinement (Yellow)', 'CAR Need Improvement(Orange)', 'CAR Need Immediate Attention(Red)', 'Tip (Purple)', 'General Remark (Grey)'];

  constructor(private base64: Base64, public navParams: NavParams, public datepipe: DatePipe, public navCtrl: NavController, private sqlite: SQLite, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {

    this.site = "";
    this.rowid = "";
    this.rowid=this.navParams.get('rowid');
    this.site=this.navParams.get('site');

  }

  convertToBase64(path) {
    let filePath: string = path;
    this.base64.encodeFile(filePath).then((base64File: string) => {
      console.log(base64File);
      return base64File;
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Page01Page');
  }

  
  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

  addData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO t_crigemba VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?)',[this.site,this.location,this.description,this.score,this.pathForImage(this.image1),this.pathForImage(this.image2),this.pathForImage(this.image3), this.convertToBase64(this.pathForImage(this.image1)),this.convertToBase64(this.pathForImage(this.image2)),this.convertToBase64(this.pathForImage(this.image3)), this.datepipe.transform(Date(), 'yyyy-MM-dd')])
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }).catch(e => {
      console.log(e);
    });
    //this.presentToast('Data saved');
  }

  // UpdateData() {
  //   this.sqlite.create({
  //     name: 'ionicdb.db',
  //     location: 'default'
  //   }).then((db: SQLiteObject) => {
  //     db.executeSql('UPDATE t_crigemba set location =?, description =?, score =?, image1 =?,image2 =?,image3 =?, date =? WHERE rowid=? and site=?', [this.location,this.description, this.score, this.pathForImage(this.image1),  this.pathForImage(this.image2),this.pathForImage(this.image3), this.datepipe.transform(Date(), 'yyyy-MM-dd')  ])
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(e => console.log(e));
  //   }).catch(e => console.log(e));
  // }
    
  
  takePicture(countPic) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(countPic, correctPath, currentName, this.createFileName());
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
  
  // Copy the image to a local folder
  private copyFileToLocalDir(countPic, namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.image = newFileName;
      if (countPic == 1) {this.image1 = this.image; }
      if (countPic == 2) {this.image2 = this.image; }
      if (countPic == 3) {this.image3 = this.image; }
      // console.log(this.image);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      console.log(img);      
      return '';      
    } else {
      console.log(img);
      this.imagepath = cordova.file.dataDirectory + img;
      // console.log(this.imagepath);
      return this.imagepath;
    }
  }

  setStep(s) {
    this.slides.slideTo(s);
    if (s==5)
    {
      this.addData();
      console.log(s);
      this.slides.slideTo(1);
      //this.presentToast('Another location!');
    }
  }

   gotoPage()
  {
    this.navCtrl.setRoot(HomePage);    
       
  }



}
