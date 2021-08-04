import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-daftar',
  templateUrl: './daftar.page.html',
  styleUrls: ['./daftar.page.scss'],
})
export class DaftarPage implements OnInit {
  public isActiveToggleTextPassword_1: boolean = true;
  public isActiveToggleTextPassword_2: boolean = true;
  public newpassword: any;
  public confirmassword: any;
  public login_mode: any;
  public user_email: any;
  public user_displayName: any;
  public usrinfo: any;
  public response: any;
  public error_msg: string = "";
  public hashcode: any;
  public user_tipe: any;
  public id_user: any;
  public nama_user: any;
  public email_user: any;
  public donasi:any;

  constructor(
    public asp: AhmadproviderService,
    public router: ActivatedRoute
  ) { }

  

  ngOnInit() {
    this.is_from_link();
  }
  is_from_link() {
    this.router.params.subscribe((params: any) => {
      if (params['idreg']) {
        this.hashcode = params['idreg'];
        this.user_tipe= params['usertipe'];
        
        this.asp.user_by_hashcode(this.hashcode).then(
          data => {
            this.response = data;
            if (this.response.status == 'error') {
              this.asp.go_page_confirm_message(this.response.message);
            }
            if (JSON.stringify(this.response.data) === '{}') {
              this.error_msg = "registrasi anda tidak terdaftar";
            }
            else {
              if (this.response.data.status=='error')
              {
                this.error_msg = this.response.data.message;
              }
              else
              {
                this.id_user = this.response.data.id;              
                this.user_displayName = this.response.data.name;
                this.user_email = this.response.data.email;
                let object_ref: any;

                this.login_mode = this.user_tipe;
                if (this.user_tipe == "donatur") {
                  object_ref = this.response.data.donatur;
                  this.donasi = this.response.data.donatur.donasi;
                }
                if (this.user_tipe == "santri") {

                  let santri={
                    "donatur_lokasi_photo":""
                  }
                  object_ref = santri;//this.response.data.santri;
                }

                this.asp.removeUserInfo();
                let userinfo = {
                  "user_id": this.id_user,
                  "user_email": this.user_email,
                  "user_displayName": this.user_displayName,
                  "user_photoURL": "",
                  "login_by": "data",
                  "login_mode": this.login_mode,
                  "ref_object": object_ref,
                  "route_from": "daftar",
                };
                this.asp.setUserInfo(userinfo);
              }
            }
          });
      }
    });
  }
  public toggleTextPassword_1(): void {
    this.isActiveToggleTextPassword_1 = (this.isActiveToggleTextPassword_1 == true) ? false : true;
  }
  public toggleTextPassword_2(): void {
    this.isActiveToggleTextPassword_2 = (this.isActiveToggleTextPassword_2 == true) ? false : true;
  }
  public getType_1() {
    return this.isActiveToggleTextPassword_1 ? 'password' : 'text';
  }
  public getType_2() {
    return this.isActiveToggleTextPassword_2 ? 'password' : 'text';
  }
  isValid(): boolean {
    let retval = false;
    if (this.newpassword.trim().length == 0) {
      this.error_msg = "* password required!";
    }
    else if (this.confirmassword.trim().length == 0) {
      this.error_msg = "* confirmation password required!";
    }
    else if (this.confirmassword.trim() != this.newpassword.trim()) {
      this.error_msg = "* passowrd dan confirmation password tidak sama";
    }
    else {
      retval = true;
    }
    return retval;
  }
  goBuatpassword() {
    let is_valid: boolean = this.isValid();
    if (is_valid) {
      this.savePassword();
      this.redirectMe();
    }
  }
  savePassword() {
    this.asp.userverification(this.id_user, this.user_email, this.newpassword).then(
      data => {
        this.response = data;
        if (this.response.status == 'error') {
          this.error_msg = this.response.message;
        }
        else {
          this.redirectMe();
        }
      });

  }
  redirectMe() {
    if (this.login_mode == "santri") {
      this.asp.go_page_santri_kuesioner();
    }
    if (this.login_mode == "donatur") {
      // bila donatur  sudah donasi atau belum
      // kalau sudah donasi redirect ke pembayaran-donasi
      if (this.donasi == null) {
        this.asp.go_page_donatur_profile();
      }
      else {
        this.goPembayaran();
      }
    }
  }
  goPembayaran() {
    let jenis_donasi_text = "";
    var donasi:any;    
    let cara_bayar = this.donasi.donasi_cara_bayar;
    switch (cara_bayar) {
      case "1":
        jenis_donasi_text = "Donasi " + "harian";
        break;
      case "2":
        jenis_donasi_text = "Donasi " + "pekanan";
        break;
      case "3":
        jenis_donasi_text = "Donasi " + "bulanan";
        break;
      case "4":
        jenis_donasi_text = "Donasi " + "penuh";
        break;
    }
    let durasi_donasi = (this.donasi.donasi_total_harga / this.donasi.donasi_nominal);
    let item_donasi = {
      "donasi_tanggal": this.donasi.donasi_tanggal,
      "donasi_cara_bayar": this.donasi.donasi_cara_bayar,
      "donasi_temp_kode_unik": this.donasi.donasi_temp_kode_unik,
      "jenis_donasi_text": jenis_donasi_text,
      "donasi_tagih": this.donasi.donasi_nominal,
      "donasi_total_harga": this.donasi.donasi_total_harga,
      "donasi_jumlah_santri": this.donasi.donasi_jumlah_santri,
      "durasi_donasi": durasi_donasi,
      "bank_selected": this.donasi.rekeningbank,
      "rekening_id": this.donasi.rekeningbank.id,
      "temp_donasi_no": this.donasi.donasi_no,
      "donasiproduk": this.donasi.produk
    };
    localStorage.setItem("item_donasi", JSON.stringify(item_donasi));
    this.asp.go_page_donasi_pembayaran();

  }
  goBack() {
    this.asp.go_page_home();
  }



}
