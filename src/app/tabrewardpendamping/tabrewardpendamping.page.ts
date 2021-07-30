import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-tabrewardpendamping',
  templateUrl: './tabrewardpendamping.page.html',
  styleUrls: ['./tabrewardpendamping.page.scss'],
})
export class TabrewardpendampingPage implements OnInit {
  public Referral_min:string="0";
  public Referral_max:string="0";
  public usrinfo: any;
  public pendamping_id: string = "";
  public user_email: string = "";
  public user_displayName: string = "";
  public pendamping_dashboard:any=[];

  constructor(
    public asp: AhmadproviderService,
  ) { }

  ngOnInit() {
    this.initpage();
  }
  initpage() {

    this.viewUser();
    this.getDashboard();
  }
  viewUser() {
    this.usrinfo = this.asp.getUserInfo();
    this.pendamping_id = this.usrinfo.ref_object.id;
    this.user_email = this.usrinfo.user_email;
    this.user_displayName = this.usrinfo.user_displayName;
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
  ajakLainnya(){
    this.asp.go_ajak_gabung_pendamping();
  }

}
