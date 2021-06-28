import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import  firebase from 'firebase';
import { AhmadproviderService } from '../ahmadprovider.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-santrireg',
  templateUrl: './santrireg.page.html',
  styleUrls: ['./santrireg.page.scss'],
})
export class SantriregPage implements OnInit {
  public nama_lengkap :string="";
  public error_msg=""; 
  response: any;
  public loading: any;
  public user = null;
  public user_email: string;
  public user_password: string;
  public user_tipe: string = "1";
  public login_mode:string="";

  
  constructor(
    private google: GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    public asp: AhmadproviderService,
    public route : Router,
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
  gotologinpage(){
    this.route.navigateByUrl('/login', { replaceUrl:true });
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
    this.route.navigate(['buatpassword']);
    this.route.ngOnDestroy();
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
          "login_mode":this.login_mode,
          "route_from":"santrireg"
        };
        localStorage.setItem("usrinfo",JSON.stringify(userinfo));
        this.route.navigateByUrl('/buatpassword', { replaceUrl: true });
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
          "login_mode":this.login_mode,
          "route_from":"santrireg"
        };
        localStorage.setItem("usrinfo",JSON.stringify(userinfo));
        this.route.navigateByUrl('/buatpassword', { replaceUrl: true });
      });

  }
  onLoginError(err) {
    console.log(err);
  }
  logout() {
    this.fireAuth.signOut().then(() => {
    });
  }  
}
