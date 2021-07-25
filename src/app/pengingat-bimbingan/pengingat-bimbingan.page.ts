import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-pengingat-bimbingan',
  templateUrl: './pengingat-bimbingan.page.html',
  styleUrls: ['./pengingat-bimbingan.page.scss'],
})
export class PengingatBimbinganPage implements OnInit {
  public pengingat_judul: string = "";
  public pengingat_isi_singkat: string = "";
  public pengingat_isi: string = "";
  public pengingat_jenis: string = "";
  public pendamping_id: string = "";
  public usrinfo: any;
  public error_msg: string = "";
  public santrilist: any;
  public noSantri: boolean = false;
  public santri_selected: any = [];


  constructor(
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.viewUser();
    this.getSantri();
  }
  viewUser() {
    this.usrinfo = this.asp.getUserInfo();
    this.pendamping_id = this.usrinfo.ref_object.id;
    this.pendamping_id = this.pendamping_id.toString();
  }
  markAsRead(e) {
    if (e.is_selected == "0") {
      e.is_selected = "1";
    }
    else {
      e.is_selected = "0";
    }
  }
  setNotRead() {
    for (var i = 0; i < this.santrilist.length; i++) {
      this.santrilist[i].is_selected = "1";
    }
  }
  getSantriSelected() {
    for (var i = 0; i < this.santrilist.length; i++) {
      if (this.santrilist[i].is_selected = "0") {
        let data = {
          "santri_id": this.santrilist[i].id
        };
        this.santri_selected.push(data)
      }
    }
  }
  async getSantri() {
    await this.asp.santri_by_pendampingId(this.pendamping_id).then(
      data => {
        let result: any;
        result = data;
        if (result.length > 0) {
          this.santrilist = result[0].santri;
          if (this.santrilist.length > 0) {
            this.noSantri = true;
          }
          else {
            this.noSantri = false;
          }
        }
        else {
          this.noSantri = false;
        }
      });
  }
  goSavePengingat() {

    this.getSantriSelected();

    this.asp.pengingat_bimbingan_simpan(this.pendamping_id, this.pengingat_judul, this.pengingat_isi_singkat, this.pengingat_isi, this.pengingat_jenis, this.santri_selected).then(
      data => {
        let result: any = data;
        if (result.status == "error") {
          this.error_msg = result.message;
        }
        else {
          this.asp.presentToast("Pengingat Bimbingan sudah disimpan");
        }
      });
  }
  goBack() {
    this.asp.go_previous_page();
  }
}
