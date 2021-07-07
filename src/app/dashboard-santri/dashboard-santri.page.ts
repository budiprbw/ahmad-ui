import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras  } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import { NavController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-dashboard-santri',
  templateUrl: './dashboard-santri.page.html',
  styleUrls: ['./dashboard-santri.page.scss'],
})
export class DashboardSantriPage implements OnInit {
public noProgram:any=true;
public noBerita:any=false;
 public usrinfo: any;
 public user_email: string="";
 public user_displayName:string=""
 public user_photoURL:any;
 public line_berita:any;
 public santri_id:string="";

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
      this.santri_id  = this.usrinfo.user_id;
      this.user_photoURL = this.usrinfo.ref_object.donatur_lokasi_photo;
      this.user_email = this.usrinfo.user_email;
      this.user_displayName = this.usrinfo.user_displayName;
      this.getlistberita();
    
  }
  getlistberita(){
    this.asp.getlist_berita_entitas('2').then(
      data=> {        
            this.line_berita=data;
            if (this.line_berita.length>0)
            {
              this.noBerita  =true;
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
    
  }
   html_entity(val){
     return this.asp.html_entity(val);    
    }

  
}
    
  
