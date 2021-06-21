import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileUploadOptions } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AhmadproviderService {
  readonly baseAPIUrl: string = 'http://127.0.0.1:8000/api/';//'http://kidswa.web.id/ahmad/core-devel/public/api/'; //';http://127.0.0.1:8000/api/'
  private api_register_donatur = this.baseAPIUrl + 'donatur/register';
  private api_register_santri = this.baseAPIUrl + 'santri/register';
  private api_santri_byemail = this.baseAPIUrl + 'santri/byemail';
  private api_donatur_byemail = this.baseAPIUrl+"donatur/byemail/";
  private api_list_berita = this.baseAPIUrl + 'berita/list';
  private api_user_login = this.baseAPIUrl + 'user/login';
  private api_all_propinsi = this.baseAPIUrl + 'kodepos/list/provinsi/all';
  private api_kota_bypropinsi = this.baseAPIUrl + 'kodepos/kotabyprovinsi/';
  private api_kec_bykota = this.baseAPIUrl + 'kodepos/kecamatanbykota/';
  private api_kel_bykec = this.baseAPIUrl + 'kodepos/kelurahanbykecamatan/';
  private api_kodepos_bykel = this.baseAPIUrl + 'kodepos/kodeposbykelurahan/';
  private api_donatur_profile_save = this.baseAPIUrl + 'donatur/update/profile/';
  private api_santri_kuesioner = this.baseAPIUrl + 'kuesioner/list';
  private api_santri_kuesioner_simpan = this.baseAPIUrl + 'kuesioner/santri/simpan'
  private api_santri_profile_save = this.baseAPIUrl + 'kuesioner/santri/update/profile';
  private api_photo_profile_santri = this.baseAPIUrl + 'santru/upload/photo/';
  private api_photo_profile_donatur = this.baseAPIUrl + 'donatur/upload/photo/';
  private api_donatur_register_sosmed =this.baseAPIUrl +  'donatur/register/sosmed';
  private api_santri_register_sosmed =this.baseAPIUrl +  'santri/register/sosmed';
  





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

  ) { }

  
  //#region  Data Master
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
  getlist_berita() {
    return new Promise(resolve => {
      this.httpclient.get(this.api_list_berita).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
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
      this.httpclient.get(this.api_donatur_byemail + '/' + user_email).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  kuesioner_getList() {
    return new Promise(resolve => {
      this.httpclient.get(this.api_santri_kuesioner).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  //#endregion

  //#region Proses Santri
  santriRegSosmed(user_email,user_name,user_password)
  {
    let data = {
      "email":user_email,
      "name": user_name,
      "password":user_password
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_santri_register_sosmed, data).subscribe(data => {
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
      "user_email": user_email,
      "user_name": nama_lengkap
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_register_santri, data).subscribe(data => {
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
//#endregion

  //#region Proses Donatur 
  register_donatur(user_email, nama_lengkap) {
    this.base_url = window.location.origin +'/buatpassword/';
    let data = {
      "email": user_email,
      "name": nama_lengkap,
      "url": this.base_url
    };
    console.log(data);
    return new Promise(resolve => {
      this.httpclient.post(this.api_register_donatur, data).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
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
      "donatur_namad": donatur_nama,
      "donatur_tmp_lahir": donatur_tmp_lahir,
      "donatur_tgl_lahir": donatur_tgl_lahir,
      "donatur_genderd": donatur_gender,
      "donatur_agama": donatur_agama,
      "donatur_telepon": donatur_telepon,
      "donatur_lokasi_photo": donatur_lokasi_photo,
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
        /** upload foto donatur */
        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: donatur_lokasi_photo.fileNameFromPath + donatur_lokasi_photo.type,
          chunkedMode: false,
          mimeType: "image/jpeg",
          headers: {}
        }
        const fileTransfer: FileTransferObject = this.transfer.create();

        fileTransfer.upload(donatur_lokasi_photo, this.api_photo_profile_donatur, options)
          .then((data) => {
            console.log('success upload donatur poto');
          }, (err) => {
            console.log(err);
          });

        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  donaturRegSosmed(user_email,user_name,user_password)
  {
    let data = {
      "user_email":user_email,
      "user_name": user_name,
      "user_password":user_password
    };
    return new Promise(resolve => {
      this.httpclient.post(this.api_donatur_register_sosmed, data).subscribe(data => {
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
  
  getUserInfo():any{
    let usrinfo: any;
    usrinfo =  JSON.parse(localStorage.getItem("usrinfo"));
    if (!(usrinfo))
    {
      this.route.navigateByUrl('/login', { replaceUrl: true });
    }
    return usrinfo;
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

  //#endregion


}
