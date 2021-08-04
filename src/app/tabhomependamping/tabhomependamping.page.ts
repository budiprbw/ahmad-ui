import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-tabhomependamping',
  templateUrl: './tabhomependamping.page.html',
  styleUrls: ['./tabhomependamping.page.scss'],
})
export class TabhomependampingPage implements OnInit {
  public noProgram: any = true;
  public noBerita: any = false;
  public usrinfo: any;
  public user_email: string = "";
  public user_displayName: string = ""
  public user_photoURL: any;
  public line_berita: any;
  public pendamping_id: string = "";
  public santrilist: any;
  public hadistList: any = [];
  public pengingatList: any = [];
  public hadistisi: any = [];
  public noHadist: any = false;
  public noPengingat: any = false;
  public pendamping_dashboard:any=[];
  public Referral_min:string="0";
  public Referral_max:string="0";
  public unread_pesan:number=0;
  public adaPesan:boolean=false;
  public user_id:any;



  constructor(
    public asp: AhmadproviderService,
  ) { }

  ngOnInit()    
   {
    this.initpage();
  }
  initpage() {

    this.viewUser();
    this.getSantri();
    this.getlistberita();
    this.getHadistHariini();
    this.getPengingat();
    this.getDashboard();
    this.getUnreadPesan();
  }
  viewUser() {
    this.usrinfo = this.asp.getUserInfo();
    this.pendamping_id = this.usrinfo.ref_object.id;
    this.user_email = this.usrinfo.user_email;
    this.user_displayName = this.usrinfo.user_displayName;
    this.user_id  = this.usrinfo.user_id;
  }
  async getSantri() {
    await this.asp.santri_by_pendampingId(this.pendamping_id).then(
      data => {
        let result: any;
        result = data;
        if (result.length > 0) {
          this.santrilist = result[0].santri;
          if (this.santrilist.length > 0) {
            this.noProgram = true;
          }
          else {
            this.noProgram = false;
          }
        }
        else {
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
    this.asp.go_page_detail_berita(item);
  }
  goInfoMasuk() {
    this.asp.go_page_notifikasi();
  }
  async getHadistHariini() {
    await this.asp.hadist_by_pendampingId(this.pendamping_id).then(
      data => {
        let retval: any = data;
        this.hadistList = retval.data;
        this.hadistisi = retval.data.hadist_isi.substring(0, 800);
        if (JSON.stringify(this.hadistList) === '{}') {
          this.noHadist = false;
        }
        else {
          this.noHadist = true;
        }
      });
  }

  async getPengingat(){
    await this.asp.pengingat_pendamping_list_byid(this.pendamping_id).then(
      data => {
        let retval: any = data;
        this.pengingatList = retval.data;
        if (JSON.stringify(this.pengingatList) === '{}') {
          this.noPengingat = false;
        }
        else {
          this.noPengingat = true;
        }
      });    
  }
  async getDashboard(){
    await this.asp.pendamping_dashboard(this.pendamping_id).then(
      data=> {        
            let result:any= data;
            this.pendamping_dashboard= result.data;
            if (this.pendamping_dashboard)
            {              
                this.Referral_min=this.pendamping_dashboard.pendamping_min_referral;
                this.Referral_max=this.pendamping_dashboard.pendamping_max_referral;
            }
      });
  }
  async getUnreadPesan() {
    await this.asp.user_pesan_unread(this.user_id).then(
      data => {
        let result: any;
        result = data;
        this.unread_pesan = result.length;
        if (result.length > 0) this.adaPesan = true;
      });
  }  
  goLihatDetail(item) {
    this.asp.go_page_penilaian_santri(item.id, this.pendamping_id);
  }
  goBack() {
    this.asp.go_previous_page();
  }
  html_entity(val) {
    return this.asp.html_entity(val);
  }
  readMore(item) {
    this.asp.go_page_view_doa(this.hadistList);
  }
  goPengingat()
  {
   this.asp.go_page_pengingat_bimbingan(); 
  }
  ajakLainnya(){
    this.asp.go_ajak_gabung_pendamping();
  }
  goKeluar() {
    this.asp.go_page_home();
  }
}
