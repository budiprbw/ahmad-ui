import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileUploadOptions } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AhmadproviderService {
  readonly api_url:string= environment.ahmadApi.baseAPIUrl;
  //#region Donatur 
  private api_register_donatur        = this.api_url + environment.ahmadApi.donatur.register;
  private api_donatur_register_sosmed = this.api_url + environment.ahmadApi.donatur.register_sosmed;
  private api_photo_profile_donatur   = this.api_url + environment.ahmadApi.donatur.upload_poto;  
  private api_donatur_profile_save    = this.api_url + environment.ahmadApi.donatur.update_profile;
  private api_donatur_byemail         = this.api_url + environment.ahmadApi.donatur.find_by_email;
  //#endregion
  
  //#region Santri  
  private api_register_santri         = this.api_url + environment.ahmadApi.santri.register;
  private api_santri_register_sosmed  = this.api_url + environment.ahmadApi.santri.register_sosmed;
  private api_santri_byemail          = this.api_url + environment.ahmadApi.santri.find_by_email;
  private api_santri_kuesioner_simpan = this.api_url + environment.ahmadApi.santri.kuesioner_simpan;
  private api_santri_profile_save     = this.api_url + environment.ahmadApi.santri.update_profile;
  private api_photo_profile_santri    = this.api_url + environment.ahmadApi.santri.upload_poto;
  //#endregion

  //#region Data Master
  private api_list_berita             = this.api_url + environment.ahmadApi.lookup.list_berita;
  private api_list_berita_kampanye    = this.api_url + environment.ahmadApi.lookup.list_berita_kampanye;
  private api_list_berita_entitas     = this.api_url + environment.ahmadApi.lookup.list_berita_entitas;
  private api_all_propinsi            = this.api_url + environment.ahmadApi.lookup.kode_pos.all_propinsi;
  private api_kota_bypropinsi         = this.api_url + environment.ahmadApi.lookup.kode_pos.kotabyprovinsi;
  private api_kec_bykota              = this.api_url + environment.ahmadApi.lookup.kode_pos.kecamatanbykota;
  private api_kel_bykec               = this.api_url + environment.ahmadApi.lookup.kode_pos.kelurahanbykecamatan;
  private api_kodepos_bykel           = this.api_url + environment.ahmadApi.lookup.kode_pos.kodeposbykelurahan;
  private api_kuesioner_list          = this.api_url + environment.ahmadApi.lookup.list_kuesioner;
  private api_lembaga                 = this.api_url + environment.ahmadApi.lookup.lembaga;
  private api_list_rekening_lembaga   = this.api_url + environment.ahmadApi.lookup.list_rekening_lembaga;
  //#endregion
  
  //#region tools
  private api_message_send_wa         = this.api_url + environment.ahmadApi.send_wa_message;
  //#endregion
  //#region User
  private api_user_login              = this.api_url + environment.ahmadApi.user.by_login;
  private api_user_by_hashcode        = this.api_url + environment.ahmadApi.user.by_hashcode;
  private api_user_change_password    = this.api_url + environment.ahmadApi.user.change_password;
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

  ) { }

  
  //#region  Data Master
  userChangePassword(id_user,email,password,tipe) {
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
  user_by_hashcode(hashcode:any) {
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

  getlist_berita() {
    return new Promise(resolve => {
      this.httpclient.get(this.api_list_berita).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
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
  getlist_berita_entitas(jenis:string) {
    return new Promise(resolve => {
      this.httpclient.get(this.api_list_berita_kampanye+jenis).subscribe(data => {
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
  kuesioner_getList() {
    return new Promise(resolve => {
      this.httpclient.get(this.api_kuesioner_list).subscribe(data => {
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
        let response:any;
        let formData = new FormData();
        formData.append('id', donatur_id);
        formData.append("donatur_photo",donatur_lokasi_photo,donatur_lokasi_photo.name);
        this.httpclient.post( this.api_photo_profile_donatur, formData).subscribe(data_Poto => {
          resolve(data_Poto);
        }, err => {
          console.log(err);
        });          
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
  
  getUserInfo():any
  {
      let usrinfo: any;
      usrinfo =  JSON.parse(localStorage.getItem("usrinfo"));
      if (!(usrinfo))
      {
        this.route.navigateByUrl('/login', { replaceUrl: true });
      }
      return usrinfo;
  }
  setUserInfo(userinfo:any){
    if (userinfo.user_photoURL=="") userinfo.user_photoURL="assets/images/no-image.png";      
    localStorage.setItem("usrinfo",JSON.stringify(userinfo));
  }
  removeUserInfo(){
    localStorage.removeItem("usrinfo");
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
