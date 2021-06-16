import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras  } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import { NavController } from '@ionic/angular';

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
    public navCtrl :NavController

  ) { }

  ngOnInit() {
    this.initpage();
  }
  initpage(){
    if (localStorage.getItem("usrinfo")!=null)
    {      
      this.usrinfo =  JSON.parse(localStorage.getItem("usrinfo"));
      this.user_photoURL=this.usrinfo.photoURL;
      this.user_email= this.usrinfo.user_email;
      this.user_displayName=this.usrinfo.displayName;
      this.getlistberita();
    }
  }
  getlistberita(){
    this.asp.getlist_berita().then(
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
    this.santri_id="1";
    this.route.navigate(['santri-notifikasi', { santri_id: this.santri_id }]);
  }
  goLihatDetail(){
    this.santri_id="1";
    this.route.navigate(['santri-program', { santri_id: this.santri_id }]);
  }
  goBack(){
    
  }

  
}
    
  
