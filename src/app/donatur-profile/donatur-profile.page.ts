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
  public donaturData: any = [];
  public propinsiInitial: any = [];
  public kotaInitial: any = [];
  public kecamatansInitial: any = [];
  public kelurahansInitial: any = [];
  public kodeposInitial: any = [];
  public isItemAvailable = false;
  public response: any;
  public user_photoURL: any;
  public user_email: string = "";
  public user_displayName: string = "";
  public login_by: string = "";
  public result: any;
  public donatur_id: string;
  public donatur_no_hp: string;
  public donatur_nama: string;
  public donatur_tmp_lahir: string;
  public donatur_tgl_lahir: string;
  public donatur_gender: string;
  public donatur_agama: string;
  public donatur_telepon: string;
  public donatur_lokasi_photo: any;
  public donatur_kerja: string;
  public donatur_alamat: string;
  public donatur_kode_pos: string;
  public donatur_kelurahan: string;
  public donatur_kecamatan: string;
  public donatur_kota: string;
  public donatur_provinsi: string;
  public donatur_no_ktp: string;
  customPopoverOptions: any = {
    header: 'Lookup data master',
    subHeader: 'Select your dats',
    message: 'Only select your data'
  };


  constructor(
    public platform: Platform,
    public asp: AhmadproviderService,
    public route: Router,
    public storage: Storage
  ) { }

  ngOnInit() {
      this.initdata();
  }
  initdata() {
    this.userInfo();
    this.getpropinsi();
  }
  userInfo() {
    this.usrinfo =  this.asp.getUserInfo();
    this.user_photoURL = this.usrinfo.ref_object.donatur_lokasi_photo;
    this.user_email = this.usrinfo.user_email;
    this.user_displayName = this.usrinfo.user_displayName;
    this.donatur_nama = this.usrinfo.user_displayName;
    this.login_by = this.usrinfo.login_by;
    this.donaturData = this.usrinfo.ref_object;
    this.donatur_id= this.usrinfo.ref_object.id;
  }
  getDonatur(){
    this.asp.login_donatur(this.user_email).then(
      data => {
        this.donaturData = data;
        this.donatur_id= this.donaturData.id;
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
    this.donatur_lokasi_photo = event.target.files[0];
  }

  goDashboard() {
    this.redirectMe();
  }
  goSaveProfile() {
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
          this.redirectMe();
        })
  }
  redirectMe(){
    this.route.navigate(['dashboard-donatur']);
  }

}

