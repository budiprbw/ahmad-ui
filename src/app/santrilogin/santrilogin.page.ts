import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import  firebase from 'firebase';
import { Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-santrilogin',
  templateUrl: './santrilogin.page.html',
  styleUrls: ['./santrilogin.page.scss'],
})
export class SantriloginPage implements OnInit {

  public loading: any;
  public isGoogleLogin = false;
  public user = null;
  public user_email: string="";
  public user_password :string="";
  public error_msg:string="";
  public response: any;
  public user_tipe:string="2";
  

  constructor(
    private google: GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    public asp: AhmadproviderService,
    public route : Router,
    
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
          localStorage.setItem("usrinfo",JSON.stringify(this.user));
          this.route.navigate(['dashboard-santri']);
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
          this.isGoogleLogin = true;
          this.user =  success.user;
          
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
    goBack(){
      this.asp.go_previous_page();
    } 
    gotoregistrasi(){
      this.route.navigateByUrl('/santrireg', { replaceUrl:true });      
    }
    async goLogin(){
      this.asp.presentLoading("login processing");
      this.asp.user_login(this.user_email,this.user_password, this.user_tipe).then(
        data=> {        
           this.response = data;
           
              if (this.response.status=='error')              
              {                
                this.error_msg=this.response.message;
                // this.route.navigate(['confirm-page',{msg:this.error_msg}]);                
              }          
              else
              {
                let userinfo = {
                  "user_email": this.response.user.user_email,
                  "user_displayName": this.response.user.user_name,
                  "user_photoURL": ""
                };
                this.user=userinfo;
                localStorage.setItem("usrinfo",JSON.stringify(userinfo));                
                this.route.navigateByUrl('/dashboard-santri', { replaceUrl:true });
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


