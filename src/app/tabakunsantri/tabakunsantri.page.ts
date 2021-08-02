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
  public Referral_min:string="0";
  public Referral_max:string="0";


  constructor(
    public asp: AhmadproviderService,
  ) { }

  ngOnInit() {
    this.userInfo();
    this.getsantriDashboard();
  }

  
  async getSantri(){
    await this.asp.login_santri(this.user_email).then(
      data => {
        this.santriData = data;
        if (this.santriData.santri_lokasi_photo!=null) this.user_photoURL= this.santriData.santri_lokasi_photo;
      });
  }
  async getsantriDashboard(){
    await this.asp.santri_dashboard(this.santri_id).then(data=>{
        let retval:any=data;
        if (retval.data.status!="error")
        {
          this.Referral_min=retval.data.santri_min_referral;
          this.Referral_max=retval.data.santri_max_referral;
        }        
    })
  }
  userInfo() {
    this.usrinfo = this.asp.getUserInfo();
    this.user_photoURL = this.usrinfo.ref_object.santri_lokasi_photo;
    this.user_email = this.usrinfo.user_email;
    this.user_displayName = this.usrinfo.user_displayName;
    this.login_by = this.usrinfo.login_by;    
    this.santri_id= this.usrinfo.ref_object.id;
    this.getSantri();
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
  goAjak(){
    this.asp.go_ajak_gabung_santri();
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
