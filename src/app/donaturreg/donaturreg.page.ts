import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';
import {  NavController, NavParams, AlertController, ToastController  } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import  firebase from 'firebase';
import { Router } from '@angular/router';


@Component({
  selector: 'app-donaturreg',
  templateUrl: './donaturreg.page.html',
  styleUrls: ['./donaturreg.page.scss'],
})
export class DonaturregPage implements OnInit {
  user_email : string;
  user_name :string;
  public loading: any;
  public isGoogleLogin = false;
  public user = null;

  constructor(
    public asp: AhmadproviderService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private google: GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private route :Router
  ) { }

  ngOnInit() {
  }
  saveregstrasi(){
    this.asp.regiaster_donatur (this.user_email,
      this.user_name).then(
    data=> {        
          console.log(data);
          this.presentToast();
    });
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Silahkan cek email anda.',
      duration: 2000
    });
    toast.present();
  }
  doLogin(){
    let params: any;
    if (this.platform.is('cordova')) {
      if (this.platform.is('android')) {
        params = {
          webClientId: '<WEB_CLIENT_ID>', //  webclientID 'string'
          offline: true
        };
      } else {
        params = {};
      }
      this.google.login(params)
      .then((response) => {
        const { idToken, accessToken } = response;
        this.onLoginSuccess(idToken, accessToken);
      }).catch((error) => {
        console.log(error);
        alert('error:' + JSON.stringify(error));
      });
    } else{
      console.log('else...');
      this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(success => {
        console.log('success in google login', success);
        this.isGoogleLogin = true;
        this.user =  success.user;
        
      }).catch(err => {
        console.log(err.message, 'error in google login');
      });
    }
  }
  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
        .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
            .credential(accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((success) => {
        alert('successfully');
        this.isGoogleLogin = true;
        this.user =  success.user;
        this.loading.dismiss();
      });

  }
  onLoginError(err) {
    console.log(err);
  }
  logout() {
    this.fireAuth.signOut().then(() => {
      this.isGoogleLogin = false;
    });
  }
  donaturloginclick()
  {
    this.route.navigateByUrl('/donaturlogin', { replaceUrl:true });
  }

}
