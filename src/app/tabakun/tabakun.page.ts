import { Component, OnInit,NgZone } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import {  Platform,NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabakun',
  templateUrl: './tabakun.page.html',
  styleUrls: ['./tabakun.page.scss'],
})
export class TabakunPage implements OnInit { 

  public user_photoURL:any;
  public usrinfo: any;
  public user_email: string = "";
  public user_displayName: string = "";
  public login_by: string = "";
  public donatur_id: string;
  public donaturData:any;
  public line_data_lembaga:any=[];

  constructor(
    private route : Router,
    private router:ActivatedRoute,
    public asp: AhmadproviderService,
    public navCtrl: NavController,
    public ngZone:NgZone
  ) { }

  ngOnInit() {
    this.userInfo();
    this.getDonatur();
    this.getDataLembaga();
  }
  userInfo() {
    this.usrinfo = this.asp.getUserInfo();
    this.user_photoURL = this.usrinfo.ref_object.donatur_lokasi_photo;
    this.user_email = this.usrinfo.user_email;
    this.user_displayName = this.usrinfo.user_displayName;
    this.login_by = this.usrinfo.login_by;
  }
  async getDonatur(){
    await this.asp.login_donatur(this.user_email).then(
      data => {
        this.donaturData = data;
        this.donatur_id= this.donaturData.id;
        if (this.donaturData.donatur_lokasi_photo!=null) this.user_photoURL= this.donaturData.donatur_lokasi_photo;
      });
  }
  async getDataLembaga(){
    await this.asp.get_lembaga().then(
      data=> {        
            this.line_data_lembaga=data;            
      });
  }
  goAjak(){
    this.route.navigate(['ajak-gabung', { mode: 'donatur' }]);
  }
  goProfile(){
    this.route.navigateByUrl('/donatur-profile');    
  }
  goFAQ(){
    this.route.navigateByUrl('/faq-list');    
  }
  goUbahPassword(){        
    this.route.navigateByUrl('/buatpassword');
    
    /*
    this.route.ngOnDestroy();
    let url = this.route.createUrlTree(['buatpassword']).toString();
    location.href=url;
    this.route.navigateByUrl('/buatpassword', { replaceUrl : true });
    this.zone.run(() => this.route.navigateByUrl('buatpassword'));
    this.navCtrl.pop['buatpassword'];
    this.route.navigate(['buatpassword']);
    this.route.ngOnDestroy();
    this.route.navigate(['/buatpassword'], { relativeTo: this.route });
    this.ngZone.run(() => {
      this.route.navigate(['/buatpassword'], { relativeTo: this.router });
    });
    */
  }
  goInfoMasuk(){

  }
  goKeluar(){
    this.asp.clearLocalstorage();
    this.route.navigateByUrl('/webdashboard', { replaceUrl:true });
  }
  html_entity(val){
    return this.asp.html_entity(val);
  }


}
