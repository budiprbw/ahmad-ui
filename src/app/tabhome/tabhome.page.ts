import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-tabhome',
  templateUrl: './tabhome.page.html',
  styleUrls: ['./tabhome.page.scss'],
})
export class TabhomePage implements OnInit {
  public adaDonasi:any=false;
  public donatur_id:any;
  public user_id:any;
  public usrinfo:any;
  public berita:any;
  public line_data_lembaga:any=[];
  public hadistList:any=[];
  public pengingatList:any=[];
  public hadistisi:any=[];
  public donatur_progress:any=[];
  public riwayatlist:any=[];
  public unread_pesan:number=0;
  public adaPesan:boolean=false;

  constructor(
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {        
    this.viewUser();
    this.cekDonasi();
    this.getDonaturDashboard();
    this.getHadistHariini();
    this.getBeritaKampanye();    
    this.getDataLembaga();
    this.getListPengingat();  
    this.getUnreadPesan();
  }
  viewUser(){
    localStorage.setItem("login_mode","donatur");
    this.usrinfo =this.asp.getUserInfo();
    this.donatur_id=  this.usrinfo.ref_object.id;
    this.user_id  = this.usrinfo.user_id;
  }
  async getBeritaKampanye(){
    await this.asp.getlist_berita_kampanye().then(
      data=> {        
        this.berita=data;
      });   
  }
  async cekDonasi(){
    this.asp.donasi_cicilan_donaturid( this.donatur_id).then(
      data=> {        
            let result:any;
            result =data;
            this.riwayatlist= result.data;
            this.adaDonasi=false;
            if (this.riwayatlist.length > 0)
            {
              this.adaDonasi=true;
            }            
      });
  }
  async getHadistHariini(){
    await this.asp.hadist_by_donaturid(this.donatur_id).then(
      data=> {        
        let retval:any=data;
        this.hadistList=retval.data;
        if (retval.data.hadist_isi!=null)this.hadistisi=retval.data.hadist_isi_singkat.substring(0,100);
      });   
  }
  async getDataLembaga(){
    await this.asp.get_lembaga().then(
      data=> {        
            this.line_data_lembaga=data;            
      });
  }
  async getListPengingat(){
    await this.asp.pengingat_donatur_byid(this.donatur_id).then(
      data=> {        
          let retval:any=data;
          this.pengingatList=retval.data;            
      });
  }
  async getDonaturDashboard(){
    await this.asp.donatur_dashboard(this.donatur_id).then(data=>{
        let retval:any=data;
        this.donatur_progress=retval.data;
    })
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
  
  goLihatdetail(){
    this.asp.go_page_santri_list();
  }
  goPengingat(){
    this.asp.go_page_donasi_riwayat();
  }
  public goInfoMasuk(){
    this.asp.go_page_notifikasi();

  }
  goSalurkanDonasi(){
    this.asp.go_page_salurkan_donasi();
  }
  html_entity(val){    
    return this.asp.html_entity(val);
  }
  readMore(item){    
    this.asp.go_page_view_doa(this.hadistList);
  }

}
