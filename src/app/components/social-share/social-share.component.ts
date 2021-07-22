import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {  Platform,NavController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.scss'],
})
export class SocialShareComponent implements OnInit {

  public sharingList= environment.socialShareOption;
    
  
  loader: any = null;
  sharingText = 'You can download our app from playstore or use this link to download the app. And you can share awesome coupons with your loved once, Thank you';
  emailSubject = 'Download Apps'
  recipent = ['recipient@example.org'];
  sharingImage = ['https://dev.ahmadproject.org/logo.5312922993b0f123276f.svg'];  
  sharingUrl = 'https://dev.ahmadproject.org';

  constructor(
    private modal: ModalController,
    private socialSharing: SocialSharing,
    private platform:Platform,
  ) { }

  ngOnInit() {
  }


  closeModal() {
    this.modal.dismiss();
  }

  async shareVia(shareData) {
    if (shareData.shareType === 'viaEmail') {
      this.shareViaEmail();
    } else {
      this.socialSharing[`${shareData.shareType}`](this.sharingText, this.sharingImage, this.sharingUrl)
      .then((res) => {
        this.modal.dismiss();
      })
      .catch((e) => {
        console.log('error', e)
        this.modal.dismiss();
      });
    }
  }
  shareViaEmail() {
    this.platform.ready()
      .then(() => 
      {
          this.socialSharing.canShareViaEmail().then((res) => {      
            this.socialSharing.shareViaEmail(this.sharingText, this.emailSubject, this.recipent, null, null, this.sharingImage).then(() => {
              this.modal.dismiss();
            })
          }).catch((e) => {
            console.log('error', e);
            this.modal.dismiss();
          });
        })  
    }
   

}
