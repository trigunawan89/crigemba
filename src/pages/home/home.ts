import { Component, ViewChild } from '@angular/core';
import { AlertController , NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Slides } from 'ionic-angular';

//user provider
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { DatePipe } from '@angular/common';
import { Base64 } from '@ionic-native/base64';

// user pages
import { Page01Page } from '../page01/page01';
import { ListPage } from '../list/list';

// user var
declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;

  t_crigemba: any = [];
  scorepath: any;
  site: any;
  location : any;
  description : any;
  score : any;
  image:any;
  image1: any;
  image2: any;
  image3: any;
  image4: any;
  image5: any;
  imagepath : any;
  image1base64:any;
  image2base64:any;
  image3base64:any;
  image4base64:any;
  image5base64:any;
  date: any;
  scoreOption: Array<string> = ['Best Practice (Green)', 'CAR Need Refinement (Yellow)', 'CAR Need Improvement(Orange)', 'CAR Need Immediate Attention(Red)', 'Tip (Purple)', 'General Remark (Grey)']
  rowid:any;

  constructor(private alertCtrl: AlertController, private base64: Base64, public datepipe: DatePipe, public navCtrl: NavController, private sqlite: SQLite, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
  }

  addData() {    
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      // db.executeSql('DROP TABLE IF EXISTS t_crigemba;', {})
      // .then(res => console.log('Executed SQL'))
      // .catch(e => console.log(e));
      db.executeSql('CREATE TABLE IF NOT EXISTS t_crigemba(rowid INTEGER PRIMARY KEY, site TEXT, location TEXT, description TEXT, score TEXT, image1 TEXT, image2 TEXT, image3 TEXT, image4 TEXT,image5 TEXT, image1base64 TEXT,image2base64 TEXT,image3base64 TEXT, image4base64 TEXT,image5base64 TEXT, date TEXT)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('INSERT INTO t_crigemba VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[this.site,this.location,this.description,this.score,this.pathForImage(this.image1),this.pathForImage(this.image2),this.pathForImage(this.image3),this.pathForImage(this.image4),this.pathForImage(this.image5), this.image1base64,this.image2base64,this.image3base64, this.image4base64,this.image5base64,this.datepipe.transform(Date(), 'yyyy-MM-dd')])
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
  
  takePicture(countPic) {
    // Create options for the Camera Dialog
    var options = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true,
      targetWidth: 1200,
      targetHeight: 1200,
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
      let filePath: string = this.pathForImage(this.image);
  
      if (countPic == 1) 
      {
          this.image1 = this.image; 
          this.base64.encodeFile(filePath).then((base64File: string) => {
           this.image1base64 = base64File; 
           console.log(this.image1base64);
          }, (err) => {
            console.log(err);
          }); 
      }
      if (countPic == 2) {
          this.image2 = this.image;
          this.base64.encodeFile(filePath).then((base64File: string) => {
            this.image2base64 = base64File; 
           }, (err) => {
             console.log(err);
           }); 
      }
      if (countPic == 3) {
        this.image3 = this.image; 
        this.base64.encodeFile(filePath).then((base64File: string) => {
          this.image3base64 = base64File; 
         }, (err) => {
           console.log(err);
         }); 
      }
      if (countPic == 4) {
        this.image4 = this.image; 
        this.base64.encodeFile(filePath).then((base64File: string) => {
          this.image4base64 = base64File; 
         }, (err) => {
           console.log(err);
         }); 
      }
      if (countPic == 5) {
        this.image5 = this.image; 
        this.base64.encodeFile(filePath).then((base64File: string) => {
          this.image5base64 = base64File; 
         }, (err) => {
           console.log(err);
         }); 
      }
      // console.log(this.image);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 1000,
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
    
    if (s==2)
    {
      this.takePicture(1)
    }
    if (s==3)
    {
      this.takePicture(2)
    }
    if (s==4)
    {
      this.takePicture(3)
    }
    if (s==5)
    {
      this.takePicture(4)
    }
    if (s==6)
    {
      this.takePicture(5)
    }
    if (s==8)
    {
      this.addData();
      this.presentConfirm();
      //console.log(s);
      
      
    }
    this.slides.slideTo(s);
  
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Location',
      message: 'Do you want to capture another location?',
      buttons: [
        {
          text: 'Yes',
          role: 'Yes',
          handler: () => {
            //this.location = "";
            //this.description ="";
            this.score = "";
            this.image = undefined;
            this.image1 = undefined;
            this.image2 = undefined;
            this.image3 = undefined;
            this.image4 = undefined;
            this.image5 = undefined;
            this.slides.slideTo(1);
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'No',
          handler: () => {
            this.site = "";
            this.location = "";
            this.description ="";
            this.score = "";
            this.image = undefined;
            this.image1 = undefined;
            this.image2 = undefined;
            this.image3 = undefined;
            this.image4 = undefined;
            this.image5 = undefined;
            this.slides.slideTo(0);
            //console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }


   gotoPage()
  {
    this.navCtrl.setRoot(HomePage);    
       
  }


}
