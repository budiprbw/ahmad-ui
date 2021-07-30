import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';
@Component({
  selector: 'app-tabakunpendamping',
  templateUrl: './tabakunpendamping.page.html',
  styleUrls: ['./tabakunpendamping.page.scss'],
})
export class TabakunpendampingPage implements OnInit {
  public user_photoURL:any;
  public usrinfo: any;
  public user_email: string = "";
  public user_displayName: string = "";
  public login_by: string = "";
  public pendamping_id: string;
  public pendampingData:any;
  public line_data_lembaga:any=[];
  public Referral_min:string="0";
  public Referral_max:string="0";
  public pendamping_dashboard:any=[];

  constructor(
    public asp: AhmadproviderService,
  ) { }

  ngOnInit() {
    this.userInfo();
    this.getPendamping();
    //this.getDataLembaga();
    this.getDashboard();
  }
  userInfo() {
    this.usrinfo = this.asp.getUserInfo();
    this.user_photoURL = this.usrinfo.ref_object.donatur_lokasi_photo;
    this.user_email = this.usrinfo.user_email;
    this.user_displayName = this.usrinfo.user_displayName;
    this.login_by = this.usrinfo.login_by;
    this.pendamping_id = this.usrinfo.ref_object.id;
  }
  async getPendamping(){
    await this.asp.pendamping_byid(this.pendamping_id).then(
      data => {
        this.pendampingData = data;        
        if (this.pendampingData.donatur_lokasi_photo!=null) this.user_photoURL= this.pendampingData.donatur_lokasi_photo;
      });
  }
  async getDashboard(){
    await this.asp.pendamping_dashboard(this.pendamping_id).then(
      data=> {        
            let result:any= data;
            this.pendamping_dashboard= result.data;
            if (this.pendamping_dashboard)
            {              
                this.Referral_min=this.pendamping_dashboard.pendamping_min_referral;
                this.Referral_max=this.pendamping_dashboard.pendamping_max_referral;
            }
      });
  }
  async getDataLembaga(){
    await this.asp.get_lembaga().then(
      data=> {        
            this.line_data_lembaga=data;            
      });
  }
  goAjak(){
    this.asp.go_ajak_gabung_pendamping();
  }
  goProfile(){
    this.asp.go_page_pendamping_profile();  
  }
  goFAQ(){
    this.asp.go_page_faq_list();
  }
  goUbahPassword(){        
    this.asp.go_page_buatpassword();
  } 
  goKeluar(){
    this.asp.go_page_home();
  }
  html_entity(val){
    return this.asp.html_entity(val);
  }


}
