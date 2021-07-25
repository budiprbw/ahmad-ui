import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';
// import { Storage } from '@ionic/storage';


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
  public error_msg:string="";


  customPopoverOptions: any = {
    header: 'Lookup data master',
    subHeader: 'Select your dats',
    message: 'Only select your data'
  };


  constructor(
    public asp: AhmadproviderService,
  ) { }

  ngOnInit() {
      this.initdata();
  }
  initdata() {
    this.userInfo();    
    this.bindData();
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
    this.donaturData= this.usrinfo.ref_object;
  }
  bindData(){
    if (this.donaturData.donatur_status=="2")
    {
      this.donatur_telepon=this.donaturData.donatur_telepon;
      this.donatur_nama= this.donaturData.donatur_nama,
      this.donatur_tmp_lahir=this.donaturData.donatur_tmp_lahir;  
      this.donatur_tgl_lahir=this.donaturData.donatur_tgl_lahir;
      this.donatur_gender= this.donaturData.donatur_gender;
      this.donatur_agama= this.donaturData.donatur_agama;
      this.donatur_telepon= this.donaturData.donatur_telepon;
      this.donatur_kerja= this.donaturData.donatur_kerja;
      this.donatur_no_ktp= this.donaturData.donatur_nid;
      this.donatur_alamat= this.donaturData.donatur_alamat;
      this.donatur_provinsi=  this.donaturData.donatur_provinsi;
      this.getkota(this.donatur_provinsi);
      this.donatur_kota =this.donaturData.donatur_kota;
      this.getkec(this.donatur_kota);
      this.donatur_kecamatan= this.donaturData.donatur_kecamatan;
      this.getkel(this.donatur_kecamatan);
      this.donatur_kelurahan= this.donaturData.donatur_kelurahan;
      this.getkodepos(this.donatur_kelurahan);
      this.donatur_kode_pos= this.donaturData.donatur_kode_pos;
    }    
  }
  async getpropinsi() {
   await this.asp.getAll_propinsi().then(
      data => {
        this.propinsiInitial = data;
      });
  }
  async getkota(v: any) {
    let val:any="";
    if (v.target!=null) {
      val=v.target.value; 
      this.donatur_kota="";
      this.donatur_kecamatan= "";
      this.donatur_kelurahan= "";
      this.donatur_kode_pos= "";
    }
    else
    {
      val=v;
    }
    
    await this.asp.getkota_bypropinsi(val).then(
      data => {
        this.kotaInitial = data;
      });
  }
  async getkec(v: any) {
    let val:any="";
    if (v.target!=null) val=v.target.value; else val=v;
    this.asp.getkec_bykota(val).then(
      data => {
        this.kecamatansInitial = data;
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
    this.donatur_lokasi_photo = event.target.files[0];
  }

  goDashboard() {
    this.redirectMe();
  }
  goSaveProfile() {
    if (this.validateInput())
    {
        let d:Date =  new Date(this.donatur_tgl_lahir);
        var dTglLahir = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();  

        this.asp.donaturUpdateProfile(
          this.donatur_id,
          this.donatur_nama,
          this.donatur_tmp_lahir,
          dTglLahir,
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
  }
  redirectMe(){
    this.asp.go_page_donatur_tabakun();
  }
  validateInput(){
    let retVal:boolean=false;
    let msg="";
    var newLine = "<br>"
    if (this.donatur_telepon=="") msg+= newLine +"No telp";    
    if (this.donatur_alamat=="")  msg+= newLine +"Alamat";
    if (this.donatur_no_ktp=="")  msg+= newLine +"No Ktp";
    if (msg!="")
    {
      msg="Silahkan check inputan" +msg;
      this.error_msg=msg;
    }
    else{
      retVal=true;
    }
    return retVal;
  }
  html_entity(val){
    return this.asp.html_entity(val);
  }

}

