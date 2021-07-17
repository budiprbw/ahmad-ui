import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { ModalController } from '@ionic/angular';
import { ModalKonfirmasiDonasiPage } from '../modal-konfirmasi-donasi/modal-konfirmasi-donasi.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loading: any;
  public user: any;
  public user_email: string;
  public user_password: string;
  public error_msg: string = "";
  public response: any;
  public user_tipe: string = "1";
  public login_mode: string = "";
  public isActiveToggleTextPassword: boolean = true;
  public notPendamping: boolean = false;


  constructor(
    private google: GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private route: Router,
    public asp: AhmadproviderService,
    public router: ActivatedRoute,
    public modalController: ModalController,
  ) { }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
    this.router.queryParams.subscribe((params: any) => {
      if (params['login_mode']) {
        this.login_mode = params['login_mode'];
        switch (this.login_mode) {
          case 'donatur':
            this.user_tipe = "1";
            this.notPendamping = true;
            break;
          case 'santri':
            this.user_tipe = "2";
            this.notPendamping = true;
            break;
          case 'pendamping':
            this.user_tipe = "3";
            break;
        }
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
        console.log('success in google login', success);
        this.user = success.user;
        this.user_email = this.user.email;
        this.goLogin_gmail();
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
        this.user_email = this.user.email;
        this.goLogin_gmail();
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
    var item_donasi: any = localStorage.getItem("item_donasi");
    if (item_donasi) {
      this.KonfirmasiDonasi();
    }
    else {
      this.route.navigateByUrl('/webdashboard', { replaceUrl: true });
    }
  }

  async KonfirmasiDonasi() {
    const modal = await this.modalController.create({
      component: ModalKonfirmasiDonasiPage,
      componentProps: {
        'model_title': "konfirmasi donasi"
      }
    });
    return await modal.present();
  }

  gotoregistrasi() {
    if (this.login_mode == 'donatur') {
      this.route.navigateByUrl('registrasi?login_mode=' + this.login_mode, { replaceUrl: true });
    }
    if (this.login_mode == 'santri') {
      this.route.navigateByUrl('/registrasi?login_mode=' + this.login_mode, { replaceUrl: true });
    }
  }
  goLogin_gmail() {
    this.asp.user_login_gmail(this.user_email).then(
      data => {
        this.response = data;
        if (this.response.status == 'error') {
          this.error_msg = this.response.message + ', not register with google';
        }
        else {
          let object_ref: any;
          if (this.login_mode == "donatur") object_ref = this.response.data.donatur;
          if (this.login_mode == "santri") object_ref = this.response.data.santri;
          if (this.login_mode == "pendamping") object_ref = this.response.data.pendamping;
          let userinfo = {
            "user_id": this.response.id,
            "user_email": this.response.email,
            "user_displayName": this.response.name,
            "is_approve": this.response.approve,
            "user_photoURL": "",
            "login_by": "data",
            "login_mode": this.login_mode,
            "ref_object": object_ref,
            "route_from": "login"
          };
          this.user = userinfo;
          this.asp.setUserInfo(userinfo);
          this.redirectMe();
        }
      });
  }
  async goLogin() {
    this.asp.presentLoading("login processing");
    this.getuserlogin();
    this.asp.dismissLoading();
  }
  getuserlogin() {
    this.asp.user_login(this.user_email, this.user_password, this.user_tipe).then(
      data => {
        this.response = data;
        if (this.response.status == 'error') {
          this.error_msg = this.response.message;
          return false;
        }
        if (this.response.tipe!==this.user_tipe)
        {
          this.error_msg = "User anda tidak sesuai";
          return false;
        }
        let object_ref: any;
        if (this.login_mode == "donatur") object_ref = this.response.donatur;
        if (this.login_mode == "santri") object_ref = this.response.santri;
        if (this.login_mode == "pendamping") object_ref = this.response.pendamping;
        let userinfo = {
          "user_id": this.response.id,
          "user_email": this.response.email,
          "user_displayName": this.response.name,
          "is_approve": this.response.approve,
          "user_photoURL": "",
          "login_by": "data",
          "login_mode": this.login_mode,
          "ref_object": object_ref,
          "route_from": "login"
        };
        this.user = userinfo;
        this.asp.setUserInfo(userinfo);
        this.redirectMe();
      });
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
  redirectMe() {
    switch (this.login_mode) {
      case "donatur":
        var is_donasi = false;
        var item_donasi: any = JSON.parse(localStorage.getItem("item_donasi"));
        let response: any;
        if (item_donasi) {
          is_donasi = true;
        }
        if (is_donasi) {
          this.route.navigateByUrl('/pembayaran-donasi', { replaceUrl: true });
        }
        else {
          switch (this.user.ref_object.donatur_status) {
            case "1":
              this.route.navigateByUrl('/donatur-profile', { replaceUrl: true });
              break;
            case "2":
              this.route.navigateByUrl('/dashboard-donatur', { replaceUrl: true });
              break;
          }
        }
        break;
      case "santri":
        switch (this.user.ref_object.santri_status) {
          case "1":
            this.route.navigateByUrl('/santri-kuesioner', { replaceUrl: true });
            break;
          case "2":
            this.route.navigate(['confirm-page', { msg: "Mohon bersabar,saat ini sedang menunggu approval dari lembaga" }]);
            break;
          case "3":
            this.route.navigateByUrl('/santri-profile', { replaceUrl: true });
            break;
          case "4":
            this.route.navigate(['confirm-page', { msg: "Mohon bersabar,Produk anda belum sampai" }]);            
            break;
          case "5":            
            this.route.navigateByUrl('/dashboard-santri', { replaceUrl: true });
            break;
          case "6":            
            this.route.navigateByUrl('/dashboard-santri', { replaceUrl: true }); //this.route.navigate(['confirm-page', { msg: "Produk anda telah sampai" }]);
            break;
          case "7":            
            this.route.navigateByUrl('/dashboard-santri', { replaceUrl: true });//this.route.navigate(['confirm-page', { msg: "dalam bimbingan" }]);
            break;
          case "8":
            this.route.navigate(['confirm-page', { msg: "bimbingan telah selesai" }]);
            break;
        }
        break;
        case "pendamping":
            this.route.navigateByUrl('/dashboard-pendamping', { replaceUrl: true });
        break;
    }
  }
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }
  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

}


