import { Component, OnInit,NgZone } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';

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
    public asp: AhmadproviderService,
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
    this.asp.go_ajak_gabung_donatur();
  }
  goProfile(){
    this.asp.go_page_donatur_profile();  
  }
  goFAQ(){
    this.asp.go_page_faq_list();
  }
  goUbahPassword(){        
    this.asp.go_page_buatpassword();
    
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
    this.asp.go_page_home();
  }
  html_entity(val){
    return this.asp.html_entity(val);
  }


}
