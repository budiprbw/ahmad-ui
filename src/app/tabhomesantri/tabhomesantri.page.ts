import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-tabhomesantri',
  templateUrl: './tabhomesantri.page.html',
  styleUrls: ['./tabhomesantri.page.scss'],
})
export class TabhomesantriPage implements OnInit {
  public noProgram:any=true;
  public noBerita:any=false;
  public noHadist:any=false;
   public usrinfo: any;
   public user_email: string="";
   public user_displayName:string=""
   public user_photoURL:any;
   public line_berita:any=[];
   public santri_id:string="";
   public user_id:string="";
   public hadistList:any=[];
   public hadistisi:any=[];
   public bulan_pendampingan:any="";
   public progress_belajar:any="";
   public santri_sisa_bulan:string=""
   public bimbingan_mulai:any;
   public bimbingan_akhir:any;
  
    constructor(
      public asp: AhmadproviderService,
  
    ) { }
  
    ngOnInit() {
      this.initpage();
    }
    initpage(){
        this.viewUser();   
        this.getHadistHariini();
        this.getPengingatSantri();
        this.getsantriDashboard();
    }
  
    viewUser(){
      this.usrinfo = this.asp.getUserInfo();
      this.santri_id  = this.usrinfo.ref_object.id;
      this.user_id  = this.usrinfo.user_id;
      this.user_photoURL = this.usrinfo.ref_object.donatur_lokasi_photo;
      this.user_email = this.usrinfo.user_email;
      this.user_displayName = this.usrinfo.user_displayName;
    }
    async getPengingatSantri()
    {
      await this.asp.pengingat_santri_byid(this.santri_id).then(
        data=> {        
              let result:any= data;
              this.line_berita.push(result.data);
              if (this.line_berita.length>0)
              {
                this.noBerita  =true;
              }
        });
  
    }
    async getlistberita(){
      await this.asp.getlist_berita_entitas('2').then(
        data=> {        
              this.line_berita=data;
              if (this.line_berita.length>0)
              {
                this.noBerita  =true;
              }
        });
    }
    async getHadistHariini(){
      await this.asp.hadist_by_santriid(this.santri_id).then(
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
    async getsantriDashboard(){
      await this.asp.santri_dashboard(this.santri_id).then(data=>{
          let retval:any=data;
          this.progress_belajar=retval.data.santri_progress_belajar;
          this.bulan_pendampingan=retval.data.santri_progress_waktu;
          this.santri_sisa_bulan  =retval.data.santri_sisa_bulan;
          this.bimbingan_mulai  =retval.data.bimbingan_mulai;
          this.bimbingan_akhir  =retval.data.bimbingan_akhir;
      })
    }
  
    beritadetail(item){    
      this.asp.go_page_detail_berita(item);      
    }
    goInfoMasuk(){    
      this.asp.go_page_notifikasi();
    }
    goLihatDetail(){
      this.asp.go_santri_program(this.santri_id);
    }
    goBack(){
      this.asp.go_previous_page();    
    }
     html_entity(val){
       return this.asp.html_entity(val);    
    }
    readMore(item){
        this.asp.go_page_view_doa(this.hadistList);
    }
    goAjak(){
       this.asp.go_ajak_gabung_santri();
    }
    
  }
  