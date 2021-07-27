import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModalController,NavParams } from '@ionic/angular';
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
  sharingUrl = environment.ahmadApi.AppUrl; //'https://dev.ahmadproject.org/';
  shareTitle ='Ahmad Project';

  constructor(
    private modal: ModalController,
    private socialSharing: SocialSharing,
    private platform:Platform,
    private navParams : NavParams
  ) { }

  ngOnInit() {
    this.sharingUrl= this.sharingUrl+ this.navParams.get('value');
  }
  closeModal() {
    this.modal.dismiss();
  }
  async shareVia(shareData) {
    switch(shareData.shareType)
    {
      case "shareViaFacebook":
        window.open('https://www.facebook.com/sharer/sharer.php?u='+this.sharingUrl, '_system', 'location=yes');
        break;
      case "viaEmail":    
        window.open('https://plus.google.com/share?url='+this.sharingUrl, '_system', 'location=yes');
        break;
      case "shareViaTwitter":
        window.open('https://twitter.com/share?url='+this.sharingUrl+'&text='+ this.shareTitle +'&hashtags=ahmadproject', '_system', 'location=yes');
        break;  
      case "shareViaWhatsApp":
        window.open('https://api.whatsapp.com/send?text='+ this.shareTitle +' '+this.sharingUrl, '_system', 'location=yes');
        break;  
    }

  }

  async shareVia_old(shareData) {
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
