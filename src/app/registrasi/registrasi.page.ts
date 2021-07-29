import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-registrasi',
  templateUrl: './registrasi.page.html',
  styleUrls: ['./registrasi.page.scss'],
})
export class RegistrasiPage implements OnInit {
  public user_email: string;
  public nama_lengkap: string;
  public loading: any;
  public user = null;
  public error_msg: string = ""
  public response: any;
  public login_mode: string = "";
  public login_by:string="";
  public referal_kode:string="";

  constructor(
    public asp: AhmadproviderService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private google: GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private route: Router,
    public router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.queryParams.subscribe((params: any) => {
      if (params['login_mode']) {
        this.login_mode = params['login_mode'];
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
      this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(success => {
        this.user = success.user;
        this.user_email=this.user.email;
        this.nama_lengkap=this.user.displayName;
        this.login_by="google";
        this.goRegister();
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
        this.user_email=this.user.email;
        this.nama_lengkap=this.user.displayName;
        this.login_by="google";
        this.goRegister();
        this.loading.dismiss();
      });

  }
  onLoginError(err) {
    console.log(err);
  }
  async logout() {    
    await this.fireAuth.signOut().then(() => {
      console.log('logout') ;
    });
  }
  gotologinpage() {
    this.route.navigateByUrl('/login?login_mode'+ this.login_mode, { replaceUrl: true });
  }
  goBack() {
    this.asp.go_previous_page();
  }
  goRegister() {
    if (this.login_by!="google"){
      if (this.user_email.trim().length == 0) {
        this.error_msg = "* email required!";
        return;
      }
      if (this.nama_lengkap.trim().length == 0) {
        this.error_msg = "* nama lengkap required!";
        return;
      }
    }
    this.start_register();
  }

  start_register(){
    switch(this.login_mode)
    {
      case "donatur":
          this.register_donatur();
           break;
      case "santri":
          this.register_santri();
          break;
    }
  }
  register_donatur() {
    //if (this.login_by!="google")this.asp.presentLoading("register processing");  
    var item_donasi:any=JSON.parse(localStorage.getItem("item_donasi"));
    if (item_donasi) 
    {
      /* register with donasi*/
      this.saveDonasi(item_donasi);
    }
    else
    {
      this.saveWithNodonasi();
    }
    //if (this.login_by!="google")this.asp.dismissLoading();        
  }
  register_santri(){
    //if (this.login_by!="google")this.asp.presentLoading("register processing");
    this.referal_kode=localStorage.getItem("referal_kode");
    if (this.referal_kode) // via referal
    {
      this.asp.santri_register_referal(this.user_email,this.nama_lengkap,this.referal_kode).then(
        data => {
          this.response = data; 
          if (this.response.status == 'error') {            
            this.error_msg = this.response.message;
          }
          else {
            if (this.login_by != "google") {
              this.error_msg = "Silahkan cek inbox anda di " + this.user_email + " untuk melanjutkan proses berikutnya";
              this.asp.go_page_confirm_message(this.error_msg);
            }
            else {
              let userinfo = {
                "user_id": this.response.id,
                "user_email": this.response.email,
                "user_displayName": this.response.name,
                "user_photoURL": "",
                "login_by": "google",
                "login_mode": this.login_mode,
                "ref_object": this.response.santri,
                "route_from": "registrasi"
              };
              this.asp.setUserInfo(userinfo);
              this.route.navigateByUrl('/buatpassword', { replaceUrl: true });
              this.route.ngOnDestroy();
            }
          }
        })
    }
    else {
      this.asp.register_santri(this.user_email,
        this.nama_lengkap).then(
          data => {
            this.response = data; //user+santri
            if (this.response.status == 'error') {
              this.error_msg = this.response.message;
            }
            else {
              if (this.login_by != "google") {
                this.error_msg = "Silahkan cek inbox anda di " + this.user_email + " untuk melanjutkan proses berikutnya";
                this.asp.go_page_confirm_message( this.error_msg); 
              }
              else {
                let userinfo = {
                  "user_id": this.response.id,
                  "user_email": this.response.email,
                  "user_displayName": this.response.name,
                  "user_photoURL": "",
                  "login_by": "google",
                  "login_mode": this.login_mode,
                  "ref_object": this.response.santri,
                  "route_from": "registrasi"
                };
                this.asp.setUserInfo(userinfo);
                this.route.navigateByUrl('/buatpassword', { replaceUrl: true });
                this.route.ngOnDestroy();
              }
            }
            if (this.login_by != "google") this.asp.dismissLoading();
          });
    }
  }

  saveDonasi(item_donasi){
    this.asp.presentLoading("Registrasi processing");
    this.asp.save_donasi_temp(item_donasi.rekening_id,
      item_donasi.donasi_tanggal,
      item_donasi.donasi_jumlah_santri,
      item_donasi.donasi_tagih,
      item_donasi.donasi_total_harga, 
      item_donasi.donasi_cara_bayar,
      item_donasi.donasiproduktemp).then(
        data => {
          this.response = data;
          if (this.response.status == 'error') {
            this.error_msg = this.response.message;                        
          }
          else {
            item_donasi.temp_donasi_no= this.response.data.temp_donasi_no;
            this.registerDonaturToDonasi(item_donasi);
          }
        });     
      this.asp.dismissLoading();
  }
  registerDonaturToDonasi(item_donasi){
    this.referal_kode=localStorage.getItem("referal_kode");
    if (this.referal_kode) // via referal
    {
      this.asp.donatur_register_donasi_referal(this.user_email,this.nama_lengkap,item_donasi.temp_donasi_no,this.referal_kode).then(data => {
        let retval:any = data;
        if (retval.status == 'error') {
          this.error_msg = retval.message;                                  
        }
        else
        {
          if (retval.data.status == 'error') {
            this.error_msg = retval.data.message;                                  
          }
          else
          {
            item_donasi.donatur = retval.data.donatur;
            item_donasi.donasi= retval.data.donatur.donasi;
            localStorage.setItem("item_donasi", JSON.stringify(item_donasi));
            if (this.login_by!="google"){
              this.error_msg = "Silahkan cek inbox anda di " + this.user_email + " untuk melanjutkan proses berikutnya";
              this.asp.go_page_confirm_message(this.error_msg); 
            }            
            else{
              this.response=retval;
              this.asp.dismissLoading();
              this.toPembayaran();            
            }
          }
        }
      });
    }
    else{
      this.asp.donaturRegisterDonasi(this.user_email,this.nama_lengkap,item_donasi.temp_donasi_no).then(
        data => {
          let retval:any = data;
          if (retval.data.status == 'error') {
              this.logout();
              this.error_msg = retval.data.message;                                  
          }
          else
          {
            item_donasi.donatur = retval.data.donatur;
            item_donasi.donasi= retval.data.donatur.donasi;
            localStorage.setItem("item_donasi", JSON.stringify(item_donasi));
            if (this.login_by!="google"){
              this.error_msg = "Silahkan cek inbox anda di " + this.user_email + " untuk melanjutkan proses berikutnya";
              this.asp.go_page_confirm_message(this.error_msg); 
            }            
            else{
              this.response=retval.data;
              this.asp.dismissLoading();
              this.toPembayaran();            
          }
        }})   
    }
    
  }
  saveWithNodonasi(){
    this.asp.presentLoading("Rgistrasi processing");
    this.asp.register_donatur(this.user_email,this.nama_lengkap).then(data => {
      this.response = data; 
      if (this.response.status == 'error') {  
        this.logout();
        this.error_msg = this.response.message;
      }
      else {
        if (this.login_by!="google"){
          this.error_msg = "Silahkan cek inbox anda di " + this.user_email + " untuk melanjutkan proses berikutnya";          
          this.asp.go_page_confirm_message(this.error_msg); 
        }            
        else{          
          this.buatpasswordAhmadProject();  
        }
      };  
    });
    this.asp.dismissLoading();
  }
  buatpasswordAhmadProject(){
    let userinfo = {
      "user_id":  this.response.id,
      "user_email": this.response.email,
      "user_displayName": this.response.name,
      "user_photoURL": "",
      "login_by": "google",
      "login_mode": this.login_mode,
      "ref_object": this.response.donatur,
      "route_from": "registrasi"
    };        
    this.asp.setUserInfo(userinfo);    
    this.route.navigateByUrl('/buatpassword', { replaceUrl: true });
  }
  toPembayaran(){
    let userinfo = {
      "user_id":  this.response.id,
      "user_email": this.response.email,
      "user_displayName": this.response.name,
      "user_photoURL": "",
      "login_by": "google",
      "login_mode": this.login_mode,
      "ref_object": this.response.donatur,
      "route_from": "registrasi"
    };        
    this.asp.setUserInfo(userinfo);    
    this.route.navigateByUrl('/pembayaran-donasi', { replaceUrl: true });
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
