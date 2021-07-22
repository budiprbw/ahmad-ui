import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router,NavigationExtras } from '@angular/router';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileUploadOptions } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser'

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
  //#endregion

  //#region Pendamping
  private api_santri_by_pendampingId = this.api_url + environment.ahmadApi.pendamping.santri_by_pendampingId;
  private api_hadist_by_pendampingId = this.api_url + environment.ahmadApi.pendamping.hadist_by_pendampingId;
  //#endregion 

  //#region Data Master
  private api_list_berita = this.api_url + environment.ahmadApi.lookup.list_berita;
  private api_list_berita_kampanye = this.api_url + environment.ahmadApi.lookup.list_berita_kampanye;
  private api_list_berita_entitas = this.api_url + environment.ahmadApi.lookup.list_berita_entitas;
  private api_all_propinsi = this.api_url + environment.ahmadApi.lookup.kode_pos.all_propinsi;
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
    private sanitized: DomSanitizer

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
  user_login(user_name, user_password, user_tipe) {
    let data = {
      "email": user_name,
      "password": user_password,
      "tipe": user_tipe,
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_user_login, data).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  user_login_gmail(user_name) {
    let data = {
      "email": user_name
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
  update_pesan_as_read(id_pesan) {
    let data = {
      "id_pesan": id_pesan,
    };
    return new Promise(resolve => {
      this.httpclient.put(this.api_user_change_password + id_pesan, data).subscribe(data => {
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
  referal_send_link(referral_entitas_kode, referral_telepon) {
    let data = {
      "referral_entitas_kode": referral_entitas_kode,
      "referral_telepon": referral_telepon
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
    santri_kecamatan,
    santri_kota,
    santri_provinsi) {
    let data = {
      "santri_id": santri_id,
      "santri_nama": santri_nama,
      "santri_tmp_lahir": santri_tmp_lahir,
      "santri_tgl_lahir": santri_tgl_lahir,
      "santri_gender": santri_gender,
      "santri_telepon": santri_telepon,
      "santri_kerja": santri_kerja,
      "santri_lokasi_photo": santri_lokasi_photo,
      "santri_alamat": santri_alamat,
      "santri_kode_pos": santri_kode_pos,
      "santri_kelurahan": santri_kelurahan,
      "santri_kecamatan": santri_kecamatan,
      "santri_kota": santri_kota,
      "santri_provinsi": santri_provinsi
    };
    return new Promise(resolve => {

      this.httpclient.post(this.api_santri_profile_save + santri_id, data).subscribe(data => {

        /** upload foto santri */
        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: santri_lokasi_photo.fileNameFromPath + santri_lokasi_photo.type,
          chunkedMode: false,
          mimeType: "image/jpeg",
          headers: {}
        }
        const fileTransfer: FileTransferObject = this.transfer.create();

        fileTransfer.upload(santri_lokasi_photo, this.api_photo_profile_santri, options)
          .then((data) => {
            console.log('success upload santri poto');
          }, (err) => {
            console.log(err);
          });
        resolve(data);
      }, err => {
        console.log(err);
      });
      resolve(data);
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
  //#endregion

  //#region Proses Donatur 
  save_donasi_temp(rekening_id,donasi_tanggal,jumlah_santri,donasi_tagih,donasi_total_harga,donasi_cara_bayar, donasiproduk) {
    let data = {
      "rekening_id": rekening_id,
      "donasi_tanggal": donasi_tanggal,
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

  simpan_donasi(donatur_id,rekening_id,donasi_tanggal,jumlah_santri,donasi_tagih,donasi_total_harga,donasi_cara_bayar, donasiproduk) {
    let data = {
      "donatur_id": donatur_id,
      "rekening_id": rekening_id,
      "donasi_nominal": donasi_tagih,
      "donasi_total_harga":donasi_total_harga,
      "donasi_cara_bayar":donasi_cara_bayar,
      "donasi_jumlah_santri": jumlah_santri,
      "donasi_tanggal": donasi_tanggal,
      "donasiproduk": donasiproduk
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
    donatur_kecamatan,
    donatur_kota,
    donatur_provinsi,

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
      "donatur_kecamatan": donatur_kecamatan,
      "donatur_kota": donatur_kota,
      "donatur_provinsi": donatur_provinsi
    };
    return new Promise(resolve => {

      this.httpclient.put(this.api_donatur_profile_save + donatur_id, data).subscribe(data => {
        resolve(data);
        /** upload foto donatur */
        let response: any;
        let formData = new FormData();
        formData.append('id', donatur_id);
        formData.append("donatur_photo", donatur_lokasi_photo, donatur_lokasi_photo.name);
        this.httpclient.post(this.api_photo_profile_donatur, formData).subscribe(data_Poto => {
          resolve(data_Poto);
        }, err => {
          console.log(err);
        });
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
      this.route.navigateByUrl('/login?login_mode='+login_mode, { replaceUrl: true });
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
    localStorage.clear();
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
        isi_doa: item.hadist_isi
      }
    };
    this.route.navigate(['view-doa'], navigationExtras);
  }

  async shareLink(wsurl:string){
    let appUrl = environment.ahmadApi.AppUrl;
    if (navigator.share){
      await navigator.share({
        title: "Ahmad Project",
        url: appUrl+ wsurl
      }).then(()=>{
        console.log("thanks for sharing");
      }).catch(console.error);
    }
  }

  //#endregion


}
