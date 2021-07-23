import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';

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
  public hadistList:any=[];
  public hadistisi:any=[];
  public noHadist:any=false;

  constructor(
    public asp: AhmadproviderService,
  ) { }

  ngOnInit() {
    this.initpage();
  }
  initpage() {

    this.viewUser();  
    this.getSantri();
    this.getlistberita();
    this.getHadistHariini();
  }

  viewUser(){
    this.usrinfo = this.asp.getUserInfo();
    this.pendamping_id = this.usrinfo.ref_object.id;
    this.user_email = this.usrinfo.user_email;
    this.user_displayName = this.usrinfo.user_displayName;
  }
  async getSantri(){
    await this.asp.santri_by_pendampingId(this.pendamping_id).then(
      data => {
        let result:any;
        result=data;
        if (result>0)
        {
          this.santrilist = result[0].santri;
          if (this.santrilist.length > 0) {
            this.noProgram = true;
          }
          else{
            this.noProgram = false;
          }
        }
        else
        {
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
  async getHadistHariini(){
    await this.asp.hadist_by_pendampingId(this.pendamping_id).then(
      data=> {        
        let retval:any=data;
        this.hadistList=retval.data;
        this.hadistisi=retval.data.hadist_isi.substring(0,800);
        if (JSON.stringify(this.hadistList) === '{}') 
        {
          this.noHadist  =false;
        }
        else
        {
          this.noHadist  =true;
        }
      });   
  }
  goLihatDetail(item) {
    this.asp.go_page_penilaian_santri( item.id,this.pendamping_id);
  }
  goBack() {
    this.asp.go_previous_page();
  }
  html_entity(val) {
    return this.asp.html_entity(val);
  }
  readMore(item){
    this.asp.go_page_view_doa(this.hadistList);
} 
  goKeluar(){
   this.asp.go_page_home();
  }

}
