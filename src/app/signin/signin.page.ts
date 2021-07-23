import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import  firebase from 'firebase';
import { Location } from '@angular/common';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  public loading: any;
  public user = null;
  public referal_kode: any;
  public is_referal:boolean=false;
  public user_tipe:string="";

  constructor(
    private google: GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    public location: Location,
    public asp: AhmadproviderService,
    private router: ActivatedRoute,
    public route: Router,
  ) {}

 
  async ngOnInit() {
    this.asp.clearLocalstorage();
    this.cek_referal();
  }
  cek_referal() {
    this.router.params.subscribe((params: any) => {
      if (params['referal_kode']) {
        this.referal_kode = params['referal_kode'];
        this.user_tipe=params['usertipe'];
        if (this.user_tipe.toUpperCase()=='DONATUR')
        {
            this.asp.go_page_salurkan_donasi();
        }
        if (this.user_tipe.toUpperCase()=='SANTRI')
        { 
            this.asp.go_page_program_santri();
        }
        localStorage.setItem("referal_kode", this.referal_kode);
        this.is_referal=true;
      }
    })
  }  
  goBack(){
     this.asp.go_previous_page();
  }
  goLogin(p){
    this.asp.go_page_login(p);
  }


}
