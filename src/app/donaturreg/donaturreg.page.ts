import { Component, OnInit } from '@angular/core';
import {  NavController, NavParams, AlertController, ToastController  } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import  firebase from 'firebase';
import { Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';


@Component({
  selector: 'app-donaturreg',
  templateUrl: './donaturreg.page.html',
  styleUrls: ['./donaturreg.page.scss'],
})
export class DonaturregPage implements OnInit {
  public user_email : string;
  public nama_lengkap :string;
  public loading: any;
  public isGoogleLogin = false;
  public user = null;
  public error_msg:string=""
  public response:any;

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
  gotologinpage(){
    this.route.navigateByUrl('/donaturlogin', { replaceUrl:true });
  }
  goBack(){
    this.asp.go_previous_page();
  }
  goRegister(){
    if(this.user_email.trim().length==0)
    {
      this.error_msg="* email required!";
      return;
    }
    if(this.nama_lengkap.trim().length==0){
      this.error_msg="* nama lengkap required!";
      return;
    }
    
    this.asp.presentLoading("register processing");
    this.asp.register_donatur(this.user_email,
      this.nama_lengkap).then(
        data => {
          this.response = data;
          if (this.response.status == 'error') {
            this.error_msg = this.response.message;
          }
          else {
            this.error_msg = "Silahkan cek inbox anda di " + this.user_email + " untuk melanjutkan proses berikutnya";
            this.route.navigate(['confirm-page', { msg: this.error_msg }]);
          }
          this.asp.dismissLoading();
        });
  }
    blurEvent1(event: string ){
      if(event.trim().length>0){
        this.error_msg="";
      }    
    }
    blurEvent2(event: string ){
      if(event.trim().length>0){
        this.error_msg="";
      }
    }


}
