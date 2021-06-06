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
 public usrinfo: any;
 public user_email: string="";
 public user_displayName:string=""
 public user_photoURL:any;
 public line_berita:any;

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
            
      });
  }

  beritadetail(item){    
    console.log(item);
    let navigationExtras: NavigationExtras = {
      state: {
        berita: item
      }
    };
    this.route.navigate(['detail-berita'], navigationExtras);
  }
}
    
  
