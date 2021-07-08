import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-pendamping',
  templateUrl: './dashboard-pendamping.page.html',
  styleUrls: ['./dashboard-pendamping.page.scss'],
})
export class DashboardPendampingPage implements OnInit {
  public noProgram: any = true;
  public noBerita: any = false;
  public usrinfo: any;
  public user_email: string = "";
  public user_displayName: string = ""
  public user_photoURL: any;
  public line_berita: any;
  public pendamping_id: string = "";
  public santrilist: any;

  constructor(
    public route: Router,
    public asp: AhmadproviderService,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.initpage();
  }
  initpage() {

    this.usrinfo = this.asp.getUserInfo();
    this.pendamping_id = this.usrinfo.ref_object.id;
    this.user_email = this.usrinfo.user_email;
    this.user_displayName = this.usrinfo.user_displayName;
    this.getSantri();
    this.getlistberita();
  }
  async getSantri(){
    await this.asp.santri_by_pendampingId(this.pendamping_id).then(
      data => {
        let result:any;
        result=data;
        this.santrilist = result[0].santri;
        if (this.santrilist.length > 0) {
          this.noProgram = true;
        }
        else{
          this.noProgram = false;
        }

      });
  }
  async getlistberita() {
    await this.asp.getlist_berita_entitas('3').then(
      data => {
        this.line_berita = data;
        if (this.line_berita.length > 0) {
          this.noBerita = true;
        }
      });
  }
  beritadetail(item) {
    let navigationExtras: NavigationExtras = {
      state: {
        berita: item
      }
    };
    this.route.navigate(['detail-berita'], navigationExtras);
  }
  goInfoMasuk() {
    this.route.navigate(['pendamping-notifikasi', { pendamping_id: this.pendamping_id }]);
  }
  goLihatDetail(item) {
    this.route.navigate(['santri-penilaian', { santri_id: item.id,pembimbing_id:this.pendamping_id }]);
  }
  goBack() {
    this.asp.go_previous_page();
  }
  html_entity(val) {
    return this.asp.html_entity(val);
  }
  goKeluar(){
    this.asp.clearLocalstorage();
    this.route.navigateByUrl('/webdashboard', { replaceUrl:true });

  }

}
