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
  public santri_kode_pos: any;
  public santri_kelurahan: string;
  public santri_kecamatan: any;
  public santri_kecamatan_id: string;
  public santri_kota: any;
  public santri_kota_id: string;
  public santri_provinsi: any;
  public santri_provinsi_id: string;
  public santri_no_ktp: string;
  public error_msg: string = "";
  public santriData:any;

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
  async initdata() {
    this.userInfo();        
    await this.getpropinsi();
    await this.getSantri();
    this.bindData();
  }
  async userInfo() {

    this.usrinfo = this.asp.getUserInfo();
    this.user_photoURL = this.usrinfo.ref_object.santri_lokasi_photo;
    this.user_email = this.usrinfo.user_email;
    this.user_displayName = this.usrinfo.user_displayName;
    this.santri_nama = this.usrinfo.user_displayName;
    this.login_by = this.usrinfo.login_by;
    this.santriData = this.usrinfo.ref_object;
    this.santri_id= this.usrinfo.ref_object.id;
  }
  async getSantri(){
    await this.asp.login_santri(this.user_email).then(
      data => {
        this.santriData = data;
        this.santri_id= this.santriData.id;
        if (this.santriData.santri_lokasi_photo!=null) this.user_photoURL= this.santriData.santri_lokasi_photo;
        
      });
  }
  async bindData(){   
      this.santri_telepon=this.santriData.santri_telepon;
      this.santri_nama= this.santriData.santri_nama,
      this.santri_tmp_lahir=this.santriData.santri_tmp_lahir;  
      this.santri_tgl_lahir=this.santriData.santri_tgl_lahir;
      this.santri_gender= this.santriData.santri_gender;
      this.santri_agama= this.santriData.santri_agama;
      this.santri_kerja= this.santriData.santri_kerja;
      this.santri_alamat= this.santriData.santri_alamat;   
      this.santri_provinsi_id=  this.santriData.santri_provinsi_id;         
      this.santri_provinsi=  this.propinsiInitial.filter(a => a.province_id ===this.santri_provinsi_id.toString())[0];
      await this.getkota(this.santri_provinsi_id);
      this.santri_kota_id =this.santriData.santri_kota_id;
      this.santri_kota=  this.kotaInitial.filter(a => a.city_id ===this.santri_kota_id.toString())[0];
      await this.getkec(this.santri_kota_id);
      this.santri_kecamatan_id= this.santriData.santri_kecamatan_id;
      this.santri_kecamatan=  this.kecamatansInitial.filter(a => a.subdistrict_id ===this.santri_kecamatan_id.toString())[0];
      this.santri_kode_pos= this.santriData.santri_kode_pos.toString();
      
      // this.getkel(this.santri_kecamatan);
      // this.santri_kelurahan= this.santriData.santri_kelurahan;
      // this.getkodepos(this.santri_kelurahan);
      
  }

 async getpropinsi() {
  await this.asp.getAll_propinsi().then(
      data => {
        this.propinsiInitial = data;         
          return true;
      });
      return false;
  }
  async getkota(v: any) {
    let val:any="";
    if (v.target!=null) {
      val=v.target.value.province_id; 
      this.santri_kota="";
      this.santri_kecamatan= "";
      this.santri_kelurahan= "";
      this.santri_kode_pos= "";
    }
    else
    {
      val=v;
    }
    await this.asp.kota_list_byprovinsi(val).then(
      data => {        
        this.kotaInitial = data;       
      });
  }
  async getkec(v: any) {
    let val:any="";   
    if (v.target!=null) val=v.target.value.city_id; else val=v;
    await this.asp.kecamaran_list_bykota(val).then(
      data => {
        this.kecamatansInitial = data;

        this.kodeposInitial= [];
        for (var i = 0; i < this.kotaInitial.length; i++) {   
          if ( this.kotaInitial[i].city_id==val){
                  let data={
                  postal_code:this.kotaInitial[i].postal_code
                }     
                this.kodeposInitial.push(data);
          }
        }

      });
  }  
  async getkel(v: any) {
    let val:any="";
    if (v.target!=null) val=v.target.value; else val=v;
    await this.asp.getkel_bykec(val).then(
      data => {
        this.kelurahansInitial = data;
      });
  }
  async getkodepos(v: any) {
    let val:any="";
    if (v.target!=null) val=v.target.value; else val=v;
    await this.asp.getkodepos_bykel(val).then(
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
      this.santri_kecamatan.subdistrict_id,
      this.santri_kecamatan.subdistrict_name,
      this.santri_kota.city_id,
      this.santri_kota.city_name,
      this.santri_provinsi.province_id,
      this.santri_provinsi.province).then(
        data => {
          this.response = data;
          let mode=localStorage.getItem("mode");
          if (mode=="tabakunsantri")
          {
            this.asp.go_previous_page();
          }
          else
          {
            this.asp.go_page_santri_reg_info();
          }          
        })
  }

  validateInput() {
    let retVal: boolean = false;
    let msg = "";
    var newLine = "<br>"
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
