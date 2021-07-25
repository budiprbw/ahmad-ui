import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-santri-profile',
  templateUrl: './santri-profile.page.html',
  styleUrls: ['./santri-profile.page.scss'],
})
export class SantriProfilePage implements OnInit {
  public usrinfo: any;

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
  private result: any;
  public santri_id: string;
  public santri_no_hp: string;
  public santri_nama: string;
  public santri_tmp_lahir: string;
  public santri_tgl_lahir: string;
  public santri_gender: string;
  public santri_agama: string;
  public santri_telepon: string;
  public santri_lokasi_photo: any;
  public santri_kerja: string;
  public santri_alamat: string;
  public santri_kode_pos: string;
  public santri_kelurahan: string;
  public santri_kecamatan: string;
  public santri_kota: string;
  public santri_provinsi: string;
  public santri_no_ktp: string;
  public error_msg: string = "";

  customPopoverOptions: any = {
    header: 'Lookup Data',
    subHeader: 'Select your Data',
    message: 'Only select your data master'
  };

  constructor(
    public asp: AhmadproviderService,
  ) { }

  ngOnInit() {
    this.initdata();
  }
  initdata() {
    this.userInfo();
    this.getpropinsi();
  }
  async userInfo() {

    this.usrinfo = this.asp.getUserInfo();
    this.user_photoURL = this.usrinfo.ref_object.donatur_lokasi_photo;
    this.user_email = this.usrinfo.user_email;
    this.user_displayName = this.usrinfo.user_displayName;
    this.santri_nama = this.usrinfo.user_displayName;
    this.login_by = this.usrinfo.login_by;

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
    this.santri_lokasi_photo = event.target.files[0];
  }
  goDashboard() {
    this.asp.go_dashboard_santri();
  }
  goSaveProfile() {
    this.asp.santriUpdateProfile(
      this.santri_id,
      this.santri_nama,
      this.santri_tmp_lahir,
      this.santri_tgl_lahir,
      this.santri_gender,
      this.santri_agama,
      this.santri_telepon,
      this.santri_kerja,
      this.santri_lokasi_photo,
      this.santri_no_ktp,
      this.santri_alamat,
      this.santri_kode_pos,
      this.santri_kelurahan,
      this.santri_kecamatan,
      this.santri_kota,
      this.santri_provinsi).then(
        data => {
          this.response = data;
          this.asp.go_page_santri_reg_info();
        })
  }

  validateInput() {
    let retVal: boolean = false;
    let msg = "";
    var newLine = "<br>"
    if (this.santri_telepon == "") msg += newLine + "No telp";
    if (this.santri_alamat == "") msg += newLine + "Alamat";
    if (msg != "") {
      msg = "Silahkan check inputan" + msg;
      this.error_msg = msg;
    }
    else {
      retVal = true;
    } 
    return retVal;
  }

  html_entity(val) {
    return this.asp.html_entity(val);
  }



}
