import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras  } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import { NavController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser'
import { fail } from 'assert';

@Component({
  selector: 'app-dashboard-santri',
  templateUrl: './dashboard-santri.page.html',
  styleUrls: ['./dashboard-santri.page.scss'],
})
export class DashboardSantriPage implements OnInit {
public noProgram:any=true;
public noBerita:any=false;
public noHadist:any=false;
 public usrinfo: any;
 public user_email: string="";
 public user_displayName:string=""
 public user_photoURL:any;
 public line_berita:any;
 public santri_id:string="";
 public hadistList:any=[];
 public hadistisi:any=[];

  constructor(
    public route : Router,
    public asp: AhmadproviderService,
    public navCtrl :NavController,
    private sanitized: DomSanitizer

  ) { }

  ngOnInit() {
    this.initpage();
  }
  initpage(){
    
      this.usrinfo = this.asp.getUserInfo();
      this.santri_id  = this.usrinfo.ref_object.id;
      this.user_photoURL = this.usrinfo.ref_object.donatur_lokasi_photo;
      this.user_email = this.usrinfo.user_email;
      this.user_displayName = this.usrinfo.user_displayName;
      this.getlistberita();
      this.getHadistHariini();
    
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

  beritadetail(item){    
      let navigationExtras: NavigationExtras = {
        state: {
          berita: item
        }
      };
      this.route.navigate(['detail-berita'], navigationExtras);
  }
  goInfoMasuk(){
    this.route.navigate(['santri-notifikasi', { santri_id: this.santri_id }]);
  }
  goLihatDetail(){
    this.route.navigate(['santri-program', { santri_id: this.santri_id }]);
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
  
}
    
  
