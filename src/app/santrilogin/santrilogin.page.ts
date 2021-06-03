import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import  firebase from 'firebase';
import { AhmadproviderService } from '../ahmadprovider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-santrilogin',
  templateUrl: './santrilogin.page.html',
  styleUrls: ['./santrilogin.page.scss'],
})
export class SantriloginPage implements OnInit {

  public loading: any;
  public isGoogleLogin = false;
  public user = null;
  

  constructor(
    private google: GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    public asp: AhmadproviderService,
    public router : Router
  ) { }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
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
    goblBack(){
      this.asp.go_previous_page();
    } 
    gotoregistrasi(){
      this.router.navigateByUrl('/santrireg', { replaceUrl:true });
    }
      
}


