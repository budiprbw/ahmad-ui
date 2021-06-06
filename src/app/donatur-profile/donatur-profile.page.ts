import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AhmadproviderService } from '../ahmadprovider.service';
import { Storage } from '@ionic/storage';

import { Router } from '@angular/router';

@Component({
  selector: 'app-donatur-profile',
  templateUrl: './donatur-profile.page.html',
  styleUrls: ['./donatur-profile.page.scss'],
})
export class DonaturProfilePage implements OnInit {
  public usrinfo: any;
  
  public propinsiInitial: any=[];
  public kotaInitial: any=[];
  public kecamatansInitial:any=[];
  public kelurahansInitial:any=[];
  public kodeposInitial:any=[];
  public isItemAvailable = false;
  public response:any;
  public user_photoURL:any;
  public user_email: string="";
  public user_displayName:string="";
  public login_by:string="";
  private result:any;
  private donatur_id:string;
  private donatur_no_hp:string;
  private donatur_nama:string;
  private donatur_tmp_lahir:string;
  private donatur_tgl_lahir:string;
  private donatur_gender:string;
  private donatur_agama:string;
  private donatur_telepon:string;
  private donatur_lokasi_photo:any;
  private donatur_kerja:string;
  private donatur_alamat:string;
  private donatur_kode_pos:string;
  private donatur_kelurahan:string;
  private donatur_kecamatan:string;
  private donatur_kota:string;
  private donatur_provinsi:string;
  private donatur_no_ktp:string;
  

  constructor(
    private platform: Platform,
    private asp: AhmadproviderService,
    private route: Router,
    private storage :Storage
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => {               
        this.initdata();
    })
  }
  initdata() {
    this.userInfo();
    this.getpropinsi();

  }
    userInfo() {
      this.storage.get('usrinfo').then((val) => {
        this.usrinfo = JSON.parse(val);
        this.user_photoURL = this.usrinfo.user_photoURL;
        this.user_email = this.usrinfo.user_email;
        this.user_displayName = this.usrinfo.user_displayName;
        this.donatur_nama= this.usrinfo.user_displayName;
        this.login_by = this.usrinfo.login_by;
      });
    }
  getpropinsi() {
    this.asp.getAll_propinsi().then(
      data => {
        this.propinsiInitial = data;
      });
  }
  getkota(v: any) {
    this.asp.getkota_bypropinsi(v.target.value).then(
      data => {
        this.kotaInitial = data;
      });
  }
  getkec(v: any) {
    this.asp.getkec_bykota(v.target.value).then(
      data => {
        this.kecamatansInitial = data;
      });
  }
  getkel(v: any) {
    this.asp.getkel_bykec(v.target.value).then(
      data => {
        this.kelurahansInitial = data;
      });
  }
  getkodepos(v: any) {
    this.asp.getkodepos_bykel(v.target.value).then(
      data => {
        this.kodeposInitial = data;
      });
  }

  changeListener(event) {
    this.donatur_lokasi_photo= event.target.files[0];
  }

  goDashboard() {
    this.route.navigateByUrl('/dashboard-donatur', { replaceUrl: true });
  }
  goSaveProfile(){
    this.asp.donaturUpdateProfile(
        this.donatur_id,
        this.donatur_nama,
        this.donatur_tmp_lahir,
        this.donatur_tgl_lahir,
        this.donatur_gender,
        this.donatur_agama,
        this.donatur_telepon,
        this.donatur_lokasi_photo,
        this.donatur_kerja,
        this.donatur_no_ktp,
        this.donatur_alamat,
        this.donatur_kode_pos,
        this.donatur_kelurahan,
        this.donatur_kecamatan,
        this.donatur_kota,
        this.donatur_provinsi).then(
      data => {    
        this.response = data;
      })
  }

}

