import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';


@Component({
  selector: 'app-tabakunsantri',
  templateUrl: './tabakunsantri.page.html',
  styleUrls: ['./tabakunsantri.page.scss'],
})
export class TabakunsantriPage implements OnInit {
  public user_photoURL:any;
  public usrinfo: any;
  public user_email: string = "";
  public user_displayName: string = "";
  public login_by: string = "";
  public santri_id: string;
  public santriData:any;
  public line_data_lembaga:any=[];

  constructor(
    public asp: AhmadproviderService,
  ) { }

  ngOnInit() {
    this.userInfo();
    this.getSantri();
  }
  async getSantri(){
    await this.asp.login_santri(this.user_email).then(
      data => {
        this.santriData = data;
        this.santri_id= this.santriData.id;
        if (this.santriData.santri_lokasi_photo!=null) this.user_photoURL= this.santriData.santri_lokasi_photo;
      });
  }
  userInfo() {
    this.usrinfo = this.asp.getUserInfo();
    this.user_photoURL = this.usrinfo.ref_object.santri_lokasi_photo;
    this.user_email = this.usrinfo.user_email;
    this.user_displayName = this.usrinfo.user_displayName;
    this.login_by = this.usrinfo.login_by;    
    localStorage.removeItem("mode");
  }
  goProfile(){
    localStorage.setItem("mode","tabakunsantri");
    this.asp.go_page_santri_profile();  
  }  
  goUbahPassword(){        
    localStorage.setItem("mode","tabakunsantri");
    this.asp.go_page_buatpassword();   
  }
  goKeluar(){
    this.asp.go_page_home();
  }
  goFAQ(){
    this.asp.go_page_faq_list();
  }
  html_entity(val){
    return this.asp.html_entity(val);
  }
}
