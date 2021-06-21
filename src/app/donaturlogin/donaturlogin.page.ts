import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-donaturlogin',
  templateUrl: './donaturlogin.page.html',
  styleUrls: ['./donaturlogin.page.scss']
})
export class DonaturloginPage implements OnInit {
  public loading: any;
  public user = null;
  public user_email: string;
  public user_password: string;
  public error_msg: string = "";
  public response: any;
  public user_tipe: string = "1";

  constructor(
    private google: GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private route: Router,
    public asp: AhmadproviderService,
    private storage :Storage
  ) { }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
  }
  doLogin() {
    let params: any;
    if (this.platform.is('cordova')) {
      if (this.platform.is('android')) {
        params = {
          webClientId: '622466272928-7sppv2sol13pkhojcn119048obvdvonv.apps.googleusercontent.com', //  webclientID 'string'
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
    } else {
      console.log('else...');
      this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(success => {
        console.log('success in google login', success);
        this.user = success.user;
        let userinfo = {
          "user_email": this.user.email,
          "user_displayName": this.user.displayName,
          "user_photoURL": this.user.photoURL,
          "login_by":"google"
        };
        /*this.storage.create();
         this.storage.set("usrinfo", JSON.stringify(userinfo));*/

        localStorage.setItem("usrinfo",JSON.stringify(userinfo));
        this.route.navigateByUrl('/donatur-profile', { replaceUrl: true });
        this.loading.dismiss();

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
        this.user = success.user;        
      });

  }
  onLoginError(err) {
    console.log(err);
  }
  logout() {
    this.fireAuth.signOut().then(() => {
    });
  }
  goBack() {
    this.asp.go_previous_page();
  }
  gotoregistrasi() {
    this.route.navigateByUrl('/donaturreg', { replaceUrl: true });
  }
  async goLogin() {
    this.asp.presentLoading("login processing");
    this.getuserlogin("0");
    this.asp.dismissLoading();
  }
  getuserlogin(dummy) {
    if (dummy == "0") {
      let userinfo = {
        "user_email": this.user_email,
        "user_displayName": "Bejo",
        "user_photoURL": ""
      };
      this.storage.create();
      this.storage.set("usrinfo", JSON.stringify(userinfo));
      
      this.route.navigateByUrl('/donatur-profile', { replaceUrl: true });
    }
    else {
        this.asp.user_login(this.user_email, this.user_password, this.user_tipe).then(
          data => {
            this.response = data;

            if (this.response.status == 'error') {
              this.error_msg = this.response.message;
              // this.route.navigate(['confirm-page',{msg:this.error_msg}]);                
            }
            else {
              let userinfo = {
                "user_email": this.response.user.user_email,
                "user_displayName": this.response.user.user_name,
                "user_photoURL": "",
                "login_by":"data"
              };
              this.user = userinfo;
              localStorage.setItem("usrinfo", JSON.stringify(userinfo));
              this.route.navigateByUrl('/donatur-profile', { replaceUrl: true });
            }
          });
      }
  }
  blurEvent1(event: string) {
    if (event.trim().length > 0) {
      this.error_msg = "";
    }
  }
  blurEvent2(event: string) {
    if (event.trim().length > 0) {
      this.error_msg = "";
    }
  }

}
