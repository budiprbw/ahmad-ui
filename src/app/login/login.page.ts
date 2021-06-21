import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Router,ActivatedRoute } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loading: any;
  public user = null;
  public user_email: string;
  public user_password: string;
  public error_msg: string = "";
  public response: any;
  public user_tipe: string = "1";
  public login_mode:string="";
  public isActiveToggleTextPassword:boolean=true;

  constructor(
    private google: GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private route: Router,
    public asp: AhmadproviderService,
    public router:ActivatedRoute
  ) { }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
    this.router.queryParams.subscribe((params: any) => {
      if (params['login_mode']){
        this.login_mode=params['login_mode'];
      }       
    });

  }
  doLogin() {
    let params: any;
    if (this.platform.is('cordova')) {
      if (this.platform.is('android')) {
        params = {
          webClientId: '169518870541-b2fuohq1lkso25u1mkkafrvk2kpccrm8.apps.googleusercontent.com', //  webclientID 'string'
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
          "login_by":"google",
          "login_mode":this.login_mode
        };
        localStorage.setItem("usrinfo",JSON.stringify(userinfo));
        this.redirectMe();
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
        this.user = success.user;
        let userinfo = {
          "user_email": this.user.email,
          "user_displayName": this.user.displayName,
          "user_photoURL": this.user.photoURL,
          "login_by":"google",
          "login_mode":this.login_mode
        };
        localStorage.setItem("usrinfo",JSON.stringify(userinfo));
        this.redirectMe();
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
    if (this.login_mode=='donatur'){
      this.route.navigateByUrl('/donaturreg?login_mode='+ this.login_mode, { replaceUrl: true });
    }
    if (this.login_mode=='santri'){
      this.route.navigateByUrl('/santrireg?login_mode='+ this.login_mode, { replaceUrl: true });
    }
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
        "user_photoURL": "",
        "login_by":"data",
        "login_mode":this.login_mode
      };
      localStorage.setItem("usrinfo", JSON.stringify(userinfo));  
      this.redirectMe();      
    }
    else {
        this.asp.user_login(this.user_email, this.user_password, this.user_tipe).then(
          data => {
            this.response = data;

            if (this.response.status == 'error') {
              this.error_msg = this.response.message;              
            }
            else {
              let userinfo = {
                "user_email": this.response.user.user_email,
                "user_displayName": this.response.user.user_name,
                "user_photoURL": "",
                "login_by":"data",
                "login_mode":this.login_mode
              };
              this.user = userinfo;
              localStorage.setItem("usrinfo", JSON.stringify(userinfo));
              this.redirectMe();              
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
  redirectMe(){
    if (this.login_mode=='donatur'){
      this.route.navigateByUrl('/donatur-profile', { replaceUrl: true });
    }
    if (this.login_mode=='santri'){
      this.route.navigateByUrl('/santri-profile', { replaceUrl: true });
    }
  }
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }
  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }
  
}

