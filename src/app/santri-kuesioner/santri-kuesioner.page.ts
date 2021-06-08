import { Component, OnInit } from '@angular/core';
import { ModalpopupPage } from '../modalpopup/modalpopup.page';
import { NavController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AhmadproviderService } from '../ahmadprovider.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-santri-kuesioner',
  templateUrl: './santri-kuesioner.page.html',
  styleUrls: ['./santri-kuesioner.page.scss'],
})
export class SantriKuesionerPage implements OnInit {
  public usrinfo: any;
  public initialKuesioner: any;
  public jawaban: any;
  public user_photoURL: any;
  public user_email: string = "";
  public user_displayName: string = "";
  public login_by: string = "";
  public santri_id: any = "1";
  public kuesioner_list: any = [];
  private is_show: any = true;

  constructor(
    public modalController: ModalController,
    public asp: AhmadproviderService,
    private route: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
    //this.userInfo();
    this.getKuesionerList();
  }

  async  presentAlertConfirm() {
    const modal = await this.modalController.create({
      component: ModalpopupPage,
      componentProps: {
        'model_title': "Nomadic model's reveberation"
      }
    });
    return await modal.present();
  }
  kuesioner_cek() {
    if (this.kuesioner_list.length != this.initialKuesioner.length) {
      this.presentAlertConfirm();
    }
    else {
      this.asp.presentToast("anda telah menjawab semua kuesioner, silahkan tekan tombol kirim !");
    }
  }

  userInfo() {
    this.storage.get('usrinfo').then((val) => {
      this.usrinfo = JSON.parse(val);
      this.user_photoURL = this.usrinfo.user_photoURL;
      this.user_email = this.usrinfo.user_email;
      this.user_displayName = this.usrinfo.user_displayName;
      this.login_by = this.usrinfo.login_by;
    });
  }

  getKuesionerList() {
    this.asp.kuesioner_getList().then(
      data => {
        this.initialKuesioner = data;
      });
  }
  onJawab(no, yesno, item: any) {
    //if exist remove
    for (var i = 0; i < this.kuesioner_list.length; i++) {
      var obj = this.kuesioner_list[i];

      if (this.kuesioner_list[i].kuesioner_id == item.id) {
        this.kuesioner_list.splice(i, 1);
      }
    }
    let row = {
      "kuesioner_id": item.id,
      "kuesioner_jawab": yesno
    };
    this.kuesioner_list.push(row);
    this.asp.presentToast("anda telah menjawab " + yesno + " untuk pertanyaan no =>" + no + " silahkanlanjutkan brikutnya!");
    //console.log(this.kuesioner_list);
  }
  kirimKuesioner() {
    this.asp.presentLoading("kuesioner submitting..");
    this.asp.kuesioner_santri_simpan(this.santri_id, this.kuesioner_list).then(
      data => {
        this.jawaban = data;
        if (this.jawaban.status == 'error') {
          this.asp.dismissLoading();
        }
        else {
          this.asp.presentToast("kuesioner berhasil di submit");
          this.route.navigateByUrl('/santri-profile', { replaceUrl: true });
        }
      }).catch(err => {
        this.asp.dismissLoading();
      });
  }
  cekJawab(item) {
    for (var i = 0; i < this.kuesioner_list.length; i++) {
      var obj = this.kuesioner_list[i];

      if (this.kuesioner_list[i].kuesioner_id == item.id) {
        return true;
      }
    }
  }
}
