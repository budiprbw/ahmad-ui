import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, NavParams, AlertController,Platform, LoadingController, ToastController,ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router,NavigationExtras } from '@angular/router';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileUploadOptions } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser'
import { AngularFireAuth } from '@angular/fire/auth';
import { SocialShareComponent } from './components/social-share/social-share.component';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
  providedIn: 'root'
})
export class AhmadproviderService {
  readonly api_url: string = environment.ahmadApi.baseAPIUrl;
  //#region Donatur 
  private api_register_donatur = this.api_url + environment.ahmadApi.donatur.register;
  private api_donatur_register_gmail = this.api_url + environment.ahmadApi.donatur.donatur_register_gmail;
  private api_photo_profile_donatur = this.api_url + environment.ahmadApi.donatur.upload_poto;
  private api_donatur_profile_save = this.api_url + environment.ahmadApi.donatur.update_profile;
  private api_donatur_byemail = this.api_url + environment.ahmadApi.donatur.find_by_email;
  private api_donatur_byId  = this.api_url + environment.ahmadApi.donatur.donatur_find_by_id;
  private api_donatur_register_referal = this.api_url + environment.ahmadApi.donatur.register_referal;
  private api_donatur_register_donasi_referal = this.api_url + environment.ahmadApi.donatur.register_donasi_referal;
  private api_hadist_by_donaturid = this.api_url + environment.ahmadApi.donatur.hadist_by_donaturid;
  private api_bimbingan_list_santri_bydonaturid = this.api_url + environment.ahmadApi.donatur.bimbingan_list_santri_bydonaturid;
  private api_berita_kampanye_donatur = this.api_url + environment.ahmadApi.donatur.berita_kampanye_donatur;
  private api_pengingat_donatur_byid = this.api_url + environment.ahmadApi.donatur.pengingat_donatur_byid;
  private api_donatur_dashboard = this.api_url + environment.ahmadApi.donatur.donatur_dashboard;
  
  
  //#endregion

  //#region Santri  
  private api_register_santri = this.api_url + environment.ahmadApi.santri.register;
  private api_santri_register_gmail = this.api_url + environment.ahmadApi.santri.santri_register_gmail;
  private api_santri_byemail = this.api_url + environment.ahmadApi.santri.find_by_email;
  private api_santri_kuesioner_simpan = this.api_url + environment.ahmadApi.santri.kuesioner_simpan;
  private api_santri_profile_save = this.api_url + environment.ahmadApi.santri.update_profile;
  private api_photo_profile_santri = this.api_url + environment.ahmadApi.santri.upload_poto;
  private api_santri_register_referal = this.api_url + environment.ahmadApi.santri.register_referal;
  private api_santri_bimbingan_progress = this.api_url + environment.ahmadApi.santri.bimbingan_progress;
  private api_santri_bimbingan_penilaian = this.api_url + environment.ahmadApi.santri.bimbingan_penilaian;
  private api_hadist_by_santriid = this.api_url + environment.ahmadApi.santri.hadist_by_santriid;
  private api_berita_kampanye_santri = this.api_url + environment.ahmadApi.santri.berita_kampanye_santri;
  private api_pengingat_santri_byid = this.api_url + environment.ahmadApi.santri.pengingat_santri_byid;
  private api_pengingat_bimbingan_simpan = this.api_url + environment.ahmadApi.santri.pengingat_bimbingan_simpan;
  private api_santri_byid = this.api_url + environment.ahmadApi.santri.santri_byid;
  private api_santri_lacak_produk = this.api_url + environment.ahmadApi.santri.santri_lacak_produk;
  private api_santri_dashboard = this.api_url + environment.ahmadApi.santri.santri_dashboard;
  
  //#endregion

  //#region Pendamping
  private api_santri_by_pendampingId = this.api_url + environment.ahmadApi.pendamping.santri_by_pendampingId;
  private api_hadist_by_pendampingId = this.api_url + environment.ahmadApi.pendamping.hadist_by_pendampingId;
  private api_pengingat_pendamping_list_byid = this.api_url + environment.ahmadApi.pendamping.pengingat_pendamping_list_byid;
  private api_pendamping_dashboard = this.api_url + environment.ahmadApi.pendamping.pendamping_dashboard;
  private api_pendamping_byid = this.api_url + environment.ahmadApi.pendamping.pendamping_byid;
  private api_pendamping_register_referral = this.api_url + environment.ahmadApi.pendamping.pendamping_register_referral;
  private api_register_pendamping = this.api_url + environment.ahmadApi.pendamping.register;
  
  //#endregion 

  //#region Data Master
  private api_list_berita = this.api_url + environment.ahmadApi.lookup.list_berita;
  private api_list_berita_kampanye = this.api_url + environment.ahmadApi.lookup.list_berita_kampanye;
  private api_list_berita_entitas = this.api_url + environment.ahmadApi.lookup.list_berita_entitas;
  private api_all_propinsi = this.api_url + environment.ahmadApi.lookup.kode_pos.all_propinsi;
  private api_kota_list_byprovinsi = this.api_url + environment.ahmadApi.lookup.kode_pos.kota_list_byprovinsi;  
  private api_kecamaran_list_bykota = this.api_url + environment.ahmadApi.lookup.kode_pos.Kecamatan_list_bykota;    
  private api_kota_bypropinsi = this.api_url + environment.ahmadApi.lookup.kode_pos.kotabyprovinsi;  
  private api_kec_bykota = this.api_url + environment.ahmadApi.lookup.kode_pos.kecamatanbykota;
  private api_kel_bykec = this.api_url + environment.ahmadApi.lookup.kode_pos.kelurahanbykecamatan;
  private api_kodepos_bykel = this.api_url + environment.ahmadApi.lookup.kode_pos.kodeposbykelurahan;
  private api_kuesioner_list = this.api_url + environment.ahmadApi.lookup.list_kuesioner;
  private api_lembaga = this.api_url + environment.ahmadApi.lookup.lembaga;
  private api_list_rekening_lembaga = this.api_url + environment.ahmadApi.lookup.list_rekening_lembaga;
  private api_list_materi = this.api_url + environment.ahmadApi.lookup.list_materi;
  private api_pengingat_list = this.api_url + environment.ahmadApi.lookup.pengingat_list;
  private api_hadist_random = this.api_url + environment.ahmadApi.lookup.hadist_random;
  //#endregion

  //#region tools
  private api_message_send_wa = this.api_url + environment.ahmadApi.send_wa_message;
  private api_referal_send_link = this.api_url + environment.ahmadApi.referal_send_link;
  
  //#endregion
  //#region User
  private api_user_login = this.api_url + environment.ahmadApi.user.by_login;
  private api_user_login_gmail = this.api_url + environment.ahmadApi.user.by_login_gmail;
  private api_user_by_hashcode = this.api_url + environment.ahmadApi.user.by_hashcode;
  private api_user_change_password = this.api_url + environment.ahmadApi.user.change_password;
  private api_user_pesan_aktif = this.api_url + environment.ahmadApi.user.pesan_aktif;  
  private api_user_update_as_read = this.api_url + environment.ahmadApi.user.update_as_read; 
  private api_pesan_unread_byuser = this.api_url + environment.ahmadApi.user.pesan_unread_byuser;   
  private api_user_pesan_delete = this.api_url + environment.ahmadApi.user.pesan_delete;  
  private api_user_verification = this.api_url + environment.ahmadApi.user.user_verification;  
  
  

  //#endregion
  //#region Product
  private api_product_by_id = this.api_url + environment.ahmadApi.product.by_id;
  //#endregion
  //#region Donasi
  private api_donasi_save_temp = this.api_url + environment.ahmadApi.donasi.save_temp;
  private api_donasi_simpan = this.api_url + environment.ahmadApi.donasi.simpan;
  private api_donatur_registrasi_donasi = this.api_url + environment.ahmadApi.donasi.registrasi_donatur;
  private api_by_donasiid_donaturid = this.api_url + environment.ahmadApi.donasi.by_donasiid_donaturid;
  private api_donasi_update_rekening= this.api_url + environment.ahmadApi.donasi.update_rekening;
  private api_donasi_cicilan_donaturid= this.api_url + environment.ahmadApi.donasi.cicilan_donaturid;
  private api_list_santri_by_donasiid= this.api_url + environment.ahmadApi.donasi.list_santri_by_donasiid;
  private api_donasi_byid= this.api_url + environment.ahmadApi.donasi.donasi_byid;
  

  //#endregion
  isLoading = false;

  public base_url: string = "";

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    public httpclient: HttpClient,
    public location: Location,
    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public router: Router,
    private transfer: FileTransfer,
    private storage: Storage,
    public route: Router,
    private sanitized: DomSanitizer,
    private fireAuth: AngularFireAuth,
    private platform:Platform,
    public modalCtrl: ModalController,
    private google: GooglePlus,
  ) { }


  //#region  Data Master
  userChangePassword(id_user, email, password, tipe) {
    let data = {
      "email": email,
      "password": password,
      "tipe": tipe
    };
    return new Promise(resolve => {
      this.httpclient.put(this.api_user_change_password + id_user, data).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  userverification(id_user, email, password) {
    let data = {
      "email": email,
      "password": password
    };
    return new Promise(resolve => {
      this.httpclient.put(this.api_user_verification + id_user, data).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  user_login(user_name, user_password, user_tipe,remember_token) {
    let data = {
      "email": user_name,
      "password": user_password,
      "tipe": user_tipe,
      "remember_token": remember_token
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_user_login, data).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  user_login_gmail(user_name,remember_token) {
    let data = {
      "email": user_name,
      "remember_token": remember_token
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_user_login_gmail, data).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }  
  user_by_hashcode(hashcode: any) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_user_by_hashcode + hashcode).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  user_pesan_aktif(user_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_user_pesan_aktif+ user_id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  user_pesan_unread(user_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_pesan_unread_byuser+ user_id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  update_pesan_as_read(id_pesan) {
    let data = {
      "id_pesan": id_pesan,
    };
    return new Promise(resolve => {
      this.httpclient.get(this.api_user_update_as_read + id_pesan).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  delete_pesan(id_pesan) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_user_pesan_delete + id_pesan).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  getlist_berita() {
    return new Promise(resolve => {
      this.httpclient.get(this.api_list_berita).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getlist_berita_entitas(entitas) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_list_berita_entitas+entitas).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  produk_by_id(id: any) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_product_by_id + id).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  getlist_berita_kampanye() {
    return new Promise(resolve => {
      this.httpclient.get(this.api_list_berita_kampanye).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  get_lembaga() {
    return new Promise(resolve => {
      this.httpclient.get(this.api_lembaga).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getlist_rekening_lembaga() {
    return new Promise(resolve => {
      this.httpclient.get(this.api_list_rekening_lembaga).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getlist_materi() {
    return new Promise(resolve => {
      this.httpclient.get(this.api_list_materi).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getlist_pengingat() {
    return new Promise(resolve => {
      this.httpclient.get(this.api_pengingat_list).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getHadist_random(jenis) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_hadist_random+jenis).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  getAll_propinsi() {
    return new Promise(resolve => {
      this.httpclient.get(this.api_all_propinsi).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  kota_list_byprovinsi(province_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_kota_list_byprovinsi + province_id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  kecamaran_list_bykota(city_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_kecamaran_list_bykota + city_id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getkota_bypropinsi(propinsi) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_kota_bypropinsi + propinsi).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }  

  getkec_bykota(kota) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_kec_bykota + kota).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getkel_bykec(kec) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_kel_bykec + kec).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getkodepos_bykel(kel) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_kodepos_bykel + kel).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  login_santri(user_email) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_santri_byemail + '/' + user_email).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }  
  santri_dashboard(santri_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_santri_dashboard + santri_id).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  santri_byid(id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_santri_byid + id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }  
  santri_lacak_produk(id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_santri_lacak_produk + id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }    
  login_donatur(user_email) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_donatur_byemail + user_email).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  find_donatur_byId(donatur_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_donatur_byId + donatur_id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  kuesioner_getList() {
    return new Promise(resolve => {
      this.httpclient.get(this.api_kuesioner_list).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  referal_send_link(referral_entitas_kode, referral_telepon,referral_entitas_tujuan) {
    let data = {
      "referral_entitas_kode": referral_entitas_kode,
      "referral_telepon": referral_telepon,
      "referral_entitas_tujuan":referral_entitas_tujuan
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_referal_send_link, data).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  //#endregion

  //#region Proses Santri  
  berita_kampanye_santri(no_urut) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_berita_kampanye_santri + no_urut).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  hadist_by_santriid(santri_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_hadist_by_santriid + santri_id).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  santriRegGmail(user_email, user_name) {
    let data = {
      "email": user_email,
      "name": user_name
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_santri_register_gmail, data).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  register_santri(user_email, nama_lengkap) {
    let data = {
      "email": user_email,
      "name": nama_lengkap
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_register_santri, data).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  santri_register_referal(user_email, nama_lengkap,referral_id) {
    let data = {
      "email": user_email,
      "name": nama_lengkap,
      "referral_id":referral_id
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_santri_register_referal, data).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  santri_bimbingan_progress(santri_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_santri_bimbingan_progress +  santri_id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  kuesioner_santri_simpan(santri_id, kuesioner_list: any) {
    let data = {
      "santri_id": santri_id,
      "kuesioner": kuesioner_list
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_santri_kuesioner_simpan, data).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }


  santriUpdateProfile(santri_id,
    santri_nama,
    santri_tmp_lahir,
    santri_tgl_lahir,
    santri_gender,
    santri_agama,
    santri_telepon,
    santri_kerja,
    santri_lokasi_photo: any,
    santri_no_ktp,
    santri_alamat,
    santri_kode_pos,
    santri_kelurahan,
    santri_kecamatan_id,
    santri_kecamatan,
    santri_kota_id,
    santri_kota,
    santri_provinsi_id,
    santri_provinsi) {
    let data = {
      "santri_id": santri_id,
      "santri_nama": santri_nama,
      "santri_tmp_lahir": santri_tmp_lahir,
      "santri_tgl_lahir": santri_tgl_lahir,
      "santri_gender": santri_gender,
      "santri_telepon": santri_telepon,
      "santri_kerja": santri_kerja,
      "santri_alamat": santri_alamat,
      "santri_kode_pos": santri_kode_pos,
      "santri_kelurahan": santri_kelurahan,
      "santri_kecamatan_id": santri_kecamatan_id,
      "santri_kecamatan": santri_kecamatan,
      "santri_kota_id": santri_kota_id,
      "santri_kota": santri_kota,
      "santri_provinsi_id": santri_provinsi_id,
      "santri_provinsi": santri_provinsi
    };
    return new Promise(resolve => {
      this.httpclient.put(this.api_santri_profile_save + santri_id, data).subscribe(data => {
        resolve(data);
        /** upload foto santri */
        if (santri_lokasi_photo!=null)
        {
            let response: any;
            let formData = new FormData();
            formData.append('id', santri_id);
            formData.append("santri_photo", santri_lokasi_photo, santri_lokasi_photo.name);
            this.httpclient.post(this.api_photo_profile_santri, formData).subscribe(data_Poto => {
              resolve(data_Poto);
            }, err => {
              console.log(err);
            });
          }
      }, err => {
        console.log(err);
      });

    });
  }
  santri_bimbingan_penilaian(santri_id,pendamping_id,materi_id,bimbingan_materi_angka,bimbingan_materi_huruf,bimbingan_materi_catatan) {
    let data = {
      "santri_id": santri_id,
      "pendamping_id": pendamping_id,
      "materi_id": materi_id,
      "bimbingan_materi_angka": bimbingan_materi_angka,
      "bimbingan_materi_huruf":bimbingan_materi_huruf,
      "bimbingan_materi_catatan":bimbingan_materi_catatan
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_santri_bimbingan_penilaian, data).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  pengingat_bimbingan_simpan(pendamping_id,pengingat_judul,pengingat_isi_singkat,pengingat_isi,pengingat_jenis,santri_list) {
    let data = {
      "pendamping_id": pendamping_id,
      "pengingat_judul": pengingat_judul,
      "pengingat_isi_singkat": pengingat_isi_singkat,
      "pengingat_isi":pengingat_isi,
      "pengingat_jenis":pengingat_jenis,
      "santri": santri_list
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_pengingat_bimbingan_simpan, data).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  pengingat_santri_byid(santri_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_pengingat_santri_byid + santri_id).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  //#endregion

  //#region Proses Pendamping
  santri_by_pendampingId(pendamping_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_santri_by_pendampingId + pendamping_id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  hadist_by_pendampingId(pendamping_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_hadist_by_pendampingId + pendamping_id).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  pengingat_pendamping_list_byid(pendamping_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_pengingat_pendamping_list_byid + pendamping_id).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  pendamping_dashboard(pendamping_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_pendamping_dashboard + pendamping_id).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  pendamping_byid(pendamping_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_pendamping_byid + pendamping_id).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  register_pendamping(user_email, nama_lengkap) {
    let data = {
      "email": user_email,
      "name": nama_lengkap
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_register_pendamping, data).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  pendamping_register_referal(user_email, nama_lengkap,referral_code) {
    let data = {
      "email": user_email,
      "name": nama_lengkap,
      "referral_id":referral_code
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_pendamping_register_referral, data).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  //#endregion

  //#region Proses Donatur 
  save_donasi_temp(rekening_id,donasi_tanggal,donasi_temp_kode_unik,jumlah_santri,donasi_tagih,donasi_total_harga,donasi_cara_bayar, donasiproduk) {
    let data = {
      "rekening_id": rekening_id,
      "donasi_tanggal": donasi_tanggal,
      "temp_donasi_kode_unik": donasi_temp_kode_unik,
      "donasi_jumlah_santri": jumlah_santri,
      "temp_donasi_nominal": donasi_tagih,
      "donasi_total_harga":donasi_total_harga,
      "donasi_cara_bayar":donasi_cara_bayar,
      "donasiproduk": donasiproduk
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_donasi_save_temp, data).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  donasi_cicilan_donaturid(donatur_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_donasi_cicilan_donaturid + donatur_id).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  list_santri_by_donasiid(donasi_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_list_santri_by_donasiid + donasi_id).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  donasi_byid(donasi_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_donasi_byid + donasi_id).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  hadist_by_donaturid(donatur_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_hadist_by_donaturid + donatur_id).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  bimbingan_list_santri_bydonaturid(donatur_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_bimbingan_list_santri_bydonaturid + donatur_id).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  pengingat_donatur_byid(donatur_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_pengingat_donatur_byid + donatur_id).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  donatur_dashboard(donatur_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_donatur_dashboard + donatur_id).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  berita_kampanye_donatur(no_urut) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_berita_kampanye_donatur + no_urut).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  donasi_findby_id_donaturid(donasi_id, donatur_id) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_by_donasiid_donaturid + donasi_id+"/"+ donatur_id).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  donasi_update_rekening(donasi_id, rekening_id) {
    let data = {
      "rekening_id": rekening_id,
    };
    return new Promise(resolve => {
      this.httpclient.put(this.api_donasi_update_rekening + donasi_id, data).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }

  simpan_donasi(donatur_id,rekening_id,donasi_tanggal,donasi_kode_unik,jumlah_santri,donasi_tagih,donasi_total_harga,donasi_cara_bayar, donasiproduk,donasi_random_santri) {
    let data = {
      "donatur_id": donatur_id,
      "rekening_id": rekening_id,
      "donasi_nominal": donasi_tagih,
      "donasi_total_harga":donasi_total_harga,
      "donasi_cara_bayar":donasi_cara_bayar,
      "donasi_jumlah_santri": jumlah_santri,
      "donasi_tanggal": donasi_tanggal,
      "donasi_kode_unik":donasi_kode_unik,
      "donasiproduk": donasiproduk,
      "donasi_random_santri": donasi_random_santri
    };
    console.log(data);
    return new Promise(resolve => {
      this.httpclient.post(this.api_donasi_simpan, data).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  donaturRegisterDonasi(email,name,nomor_donasi) {
    let data = {
      "email": email,
      "name": name,
      "nomor_donasi": nomor_donasi
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_donatur_registrasi_donasi, data).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  //#endregion

  //#region Proses Donatur   
  register_donatur(user_email, nama_lengkap) {
    let data = {
      "email": user_email,
      "name": nama_lengkap
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_register_donatur, data).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  donatur_register_referal(user_email, nama_lengkap,referral_code) {
    let data = {
      "email": user_email,
      "name": nama_lengkap,
      "referral_id":referral_code
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_donatur_register_referal, data).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  donatur_register_donasi_referal(user_email, nama_lengkap,nomor_donasi,referral_id) {
    let data = {
      "email": user_email,
      "name": nama_lengkap,
      "nomor_donasi":nomor_donasi,
      "referral_id":referral_id
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_donatur_register_donasi_referal, data).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);      
      });
    });
  }
  

  donaturUpdateProfile(donatur_id,
    donatur_nama,
    donatur_tmp_lahir,
    donatur_tgl_lahir,
    donatur_gender,
    donatur_agama,
    donatur_telepon,
    donatur_lokasi_photo: any,
    donatur_kerja,
    donatur_no_ktp,
    donatur_alamat,
    donatur_kode_pos,
    donatur_kelurahan,
    donatur_kecamatan_id,
    donatur_kecamatan,    
    donatur_kota_id,
    donatur_kota,
    donatur_provinsi_id,
    donatur_provinsi 
  ) {
    let data = {
      "donatur_id": donatur_id,
      "donatur_nid": donatur_no_ktp,      
      "donatur_nama": donatur_nama,
      "donatur_tmp_lahir": donatur_tmp_lahir,
      "donatur_tgl_lahir": donatur_tgl_lahir,
      "donatur_gender": donatur_gender,
      "donatur_agama": donatur_agama,
      "donatur_telepon": donatur_telepon,
      "donatur_kerja": donatur_kerja,
      "donatur_alamat": donatur_alamat,
      "donatur_kode_pos": donatur_kode_pos,
      "donatur_kelurahan": donatur_kelurahan,
      "donatur_kecamatan_id":donatur_kecamatan_id,
      "donatur_kecamatan": donatur_kecamatan,
      "donatur_kota_id":donatur_kota_id,
      "donatur_kota": donatur_kota,
      "donatur_provinsi_id":donatur_provinsi_id,
      "donatur_provinsi": donatur_provinsi      
    };
    return new Promise(resolve => {

      this.httpclient.put(this.api_donatur_profile_save + donatur_id, data).subscribe(data => {
        resolve(data);
        /** upload foto donatur */
        if (donatur_lokasi_photo!=null){
          let response: any;
          let formData = new FormData();
          formData.append('id', donatur_id);
          formData.append("donatur_photo", donatur_lokasi_photo, donatur_lokasi_photo.name);
          this.httpclient.post(this.api_photo_profile_donatur, formData).subscribe(data_Poto => {
            resolve(data_Poto);
          }, err => {
            console.log(err);
          });
        }        
      }, err => {
        console.log(err);
      });
    });
  }
  donaturRegGmail(user_email, user_name) {
    let data = {
      "user_email": user_email,
      "user_name": user_name
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_donatur_register_gmail, data).subscribe(data => {
        let result = {
          "message": '',
          "status": 'OK',
          "data": data
        };
        resolve(result);
      }, err => {
        let result = {
          "message": err.message,
          "status": 'error'
        };
        resolve(result);
      });
    });
  }
  //#endregion

  //#region  Method helper
  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }

  getUserInfo(): any {
    let login_mode=localStorage.getItem("login_mode");
    let usrinfo: any;
    usrinfo = JSON.parse(localStorage.getItem("usrinfo"));
    if (!(usrinfo)) {
      //this.route.navigateByUrl('/login?login_mode='+login_mode, { replaceUrl: true });
      this.route.navigateByUrl('/home', { replaceUrl:true });    
    }
    return usrinfo;
  }

  setUserInfo(userinfo: any) {
    if (userinfo.ref_object!=null){
      if (userinfo.ref_object.donatur_lokasi_photo == null) userinfo.ref_object.donatur_lokasi_photo = "assets/images/no-image.png";
      if (userinfo.ref_object.donatur_lokasi_photo == "") userinfo.ref_object.donatur_lokasi_photo = "assets/images/no-image.png";
    }
    else
    {
      let ref_object={
        "donatur_lokasi_photo":"assets/images/no-image.png"
      }
      userinfo.ref_object=ref_object;
    }
    localStorage.setItem("usrinfo", JSON.stringify(userinfo));
  }
  async removeUserInfo() {
    await localStorage.removeItem("usrinfo");
  }
  async removeItemDonasi() {
    await localStorage.removeItem("item_donasi");
  }
  clearLocalstorage(){    
    localStorage.removeItem("usrinfo");
    localStorage.removeItem("item_donasi");
    localStorage.removeItem("login_mode");
    localStorage.removeItem("mode");
    localStorage.removeItem("referal_kode");
  }  
  setPushNotifToken(token){
    console.log('set token ' + token);
    localStorage.setItem("remember_token", token);
  }
  getPushNotifToken(){
    let result="";
    let token =localStorage.getItem("remember_token");
    if (token){
      result=token;
    }
    return result;
  }
  removePushNotifToken(token){
    localStorage.removeItem("remember_token");
  }

  seDarkMode() {
    localStorage.setItem("darkMode", 'dark');
    /* 
      set element to dark
    */
   document.body.setAttribute('color-theme','dark');   
   let htmlclass= document.querySelector('html').classList ;          
   htmlclass.add("class",'dark');  
  }
  removeDarkMode() {
    localStorage.removeItem("darkMode");
    /* 
      remove element to dark
    */
    document.body.setAttribute('color-theme','light'); 
    let htmlclass= document.querySelector('html').classList ;          
    htmlclass.remove('dark');       
  }
  isDarkMode(){
    let retVal:string ='0'; 
    let darkMode =localStorage.getItem("darkMode");
    if (darkMode) retVal='1';
    return retVal;         
  }
  go_previous_page() {
    this.location.back();
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading(wait_message) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: wait_message
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }
   html_entity(val){
    return  this.sanitized.bypassSecurityTrustHtml(val);    
   }
   format_number(v){
    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');    
  }

  go_page_view_doa(item){
    let navigationExtras: NavigationExtras = {
      state: {
        judul_doa: item.hadist_judul,
        isi_doa: item.hadist_isi,
        hadist_lokasi_video:item.hadist_lokasi_video
      }
    };
    this.route.navigate(['view-doa'], navigationExtras);
  }

  go_page_confirm_message(msg){
    let navigationExtras: NavigationExtras = {
      state: {
        msg: msg
      }
    };
    this.route.navigate(['confirm-page'], navigationExtras);
  }

  async shareLink(wsurl:string){
    let appUrl = environment.ahmadApi.AppUrl;    
    if (this.platform.is('desktop')) {      
          const modal = await this.modalCtrl.create({
            component: SocialShareComponent,
            componentProps: { 
              value:  wsurl
            },
            cssClass: 'backTransparent',
            backdropDismiss: true
          });
          return modal.present();
    }
    else
    {        
          if (navigator.share){
            await navigator.share({
              title: "Ahmad Project",
              url: appUrl+ wsurl
            }).then(()=>{
              console.log("thanks for sharing");
            }).catch(console.error);
          }
    }    
  }

  go_page_penilaian_santri(santri_id,pendamping_id){
    this.route.navigate(['santri-penilaian', { santri_id: santri_id, pembimbing_id:pendamping_id }]);
  }

  go_page_notifikasi(){
    this.route.navigate(['notifikasi']);
  }
  go_page_detail_berita(item){
    let navigationExtras: NavigationExtras = {
      state: {
        berita: item
      }
    };
    this.route.navigate(['detail-berita'], navigationExtras);
  }
  go_page_donasi_detail(item){
    let navigationExtras: NavigationExtras = {
      state: {
        cicilan: item.cicilan
      }
    };
    this.route.navigate(['donasi-detail'], navigationExtras);
  }
  go_page_view_pembayaran_donasi(item){
    let navigationExtras: NavigationExtras = {
      state: {
        item_donasi: item
      }
    };
    this.route.navigate(['view-pembayaran-donasi'], navigationExtras);
  }
  go_page_home(){
    if (this.platform.is('cordova')) {
      if (this.platform.is('android')) {
        this.google.logout().then(() => {    
        });
      }
    }
    else
    {
        let usrinfo:any = this.getUserInfo(); 
        if(usrinfo!=null){
          if (usrinfo.login_by=="gmail"){        
            this.fireAuth.signOut().then(() => {       
              var myWindowURL = "https://mail.google.com/mail/u/0/?logout&hl=en", myWindowName = "ONE";
              var myWindowProperties  = "width=300,height=310,top=100,left=100,menubar=no,toolbar=no,titlebar=no,statusbar=no";
              var openWindow;
                setTimeout(function() {
                      openWindow = window.open(myWindowURL, myWindowName, myWindowProperties); 
                  }, 1000);
                setTimeout(function() { 
                    openWindow.close() 
                }, 2000);     
            });
          }
        }
    }
    this.clearLocalstorage();
    this.route.navigateByUrl('/mainhome', { replaceUrl:true });    
  }
  go_ajak_gabung_santri(){
    this.route.navigateByUrl('/ajak-gabung?mode=santri');
  }
  go_ajak_gabung_donatur(){
    this.route.navigateByUrl('/ajak-gabung?mode=donatur');
  }
  go_ajak_gabung_pendamping(){
    this.route.navigateByUrl('/ajak-gabung?mode=pendamping');
  }
  go_santri_program(santri_id){
    this.route.navigate(['santri-program', { santri_id: santri_id }]);
  }
  go_dashboard_pendamping(){
    this.route.navigateByUrl('/dashboard-pendamping', { replaceUrl: true });
  }
  go_dashboard_donatur(){
    this.route.navigateByUrl('/dashboard-donatur', { replaceUrl: true });
  }
  go_dashboard_santri(){
    this.route.navigateByUrl('/dashboard-santri', { replaceUrl: true });
  }
  go_page_santri_profile(){
    this.route.navigateByUrl('/santri-profile', { replaceUrl: true });
  }
  go_page_donatur_profile(){
    this.route.navigateByUrl('/donatur-profile', { replaceUrl: true });
  }
  go_page_pendamping_profile(){
    this.route.navigateByUrl('/pendamping-profile', { replaceUrl: true });
  }
  go_page_santri_kuesioner(){
    this.route.navigateByUrl('/santri-kuesioner', { replaceUrl: true });
  }
  go_page_donasi_pembayaran(){
    this.route.navigateByUrl('/pembayaran-donasi', { replaceUrl: true });
  }
  go_page_registrasi(login_mode){
    this.route.navigateByUrl('/registrasi?login_mode=' + login_mode, { replaceUrl: true });
  }
  go_page_login(login_mode){
    this.route.navigateByUrl('/login?login_mode=' + login_mode);
  }
  go_page_donasi_tanya_akun(){
    this.route.navigateByUrl('/donasi-tanya-akun?login_mode=donatur', { replaceUrl: true });
  }
  go_page_faq_list(){
    this.route.navigateByUrl('/faq-list');    
  }
  go_page_buatpassword(){
    this.route.navigateByUrl('/buatpassword');
  }
  go_page_salurkan_donasi(){
      this.route.navigateByUrl('/penyaluran-donasi', { replaceUrl:true });
  }  
  go_page_donasi_riwayat(){
    this.route.navigateByUrl('/donasi-riwayat', { replaceUrl:true });
  }
  go_page_santri_list(){
    this.route.navigateByUrl('/donasi-santri-list');
  }
  go_page_program_santri(){
    this.route.navigateByUrl('/program-santri');    
  }
  go_page_program_pendamping(){
    this.route.navigateByUrl('/program-pendamping');    
  }
  go_page_pengingat_bimbingan(){
    this.route.navigateByUrl('/pengingat-bimbingan');    
  }
  go_page_selesai_donasi(){
    this.router.navigateByUrl('/selesai-donasi');
  }
  go_page_jadual_pembayaran(){
    this.router.navigateByUrl('/jadual-pembayaran-donasi');
  }
  go_page_donatur_tabakun(){
    this.route.navigate(['/dashboard-donatur/tabakun']);    
  }
  go_page_santri_reg_info(){
    this.route.navigateByUrl('santri-reg-info', { replaceUrl: true });    
  }
  go_page_pengiriman_status(){
    this.route.navigateByUrl('/pengiriman-status', { replaceUrl: true });   
  }
  go_page_pengiriman_status_donasi(){
    this.route.navigateByUrl('/pengiriman-status-donasi');   
  }
  go_page_daftar_santri_penilaian(){
    this.route.navigateByUrl('/daftar-santri-penilaian');    
  }
  go_page_your_url(url){
    this.route.navigateByUrl('/'+ url, { replaceUrl: true });
  }
  random_kode_unik(){
      let max=999;
      let kode_unik:number = Math.floor(Math.random() * max);
      let nomor: string= kode_unik.toString().padStart(3, '0');
      return nomor;
  }


  //#endregion




}
