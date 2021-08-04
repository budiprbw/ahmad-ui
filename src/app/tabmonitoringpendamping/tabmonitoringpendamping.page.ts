import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-tabmonitoringpendamping',
  templateUrl: './tabmonitoringpendamping.page.html',
  styleUrls: ['./tabmonitoringpendamping.page.scss'],
})
export class TabmonitoringpendampingPage implements OnInit {
  public usrinfo: any;
  public pendamping_id: string = "";
  public user_email: string = "";
  public user_displayName: string = "";
  public pendamping_dashboard:any=[];
  public santri_aktif:any;
  public santri_selesai:any;
  public bimbingan_santri_progress:number=0;
  public Referral_min:string="0";
  public Referral_max:string="0";

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
            this.santri_aktif=0;
            this.santri_selesai=0;  
            this.bimbingan_santri_progress=0;
            if (this.pendamping_dashboard)
            {              
                this.santri_aktif=this.pendamping_dashboard.pendamping_santri_aktif;
                this.santri_selesai=this.pendamping_dashboard.pendamping_santri_selesai;
                this.bimbingan_santri_progress=this.pendamping_dashboard.pendamping_bimbingan_progress;
                this.Referral_min=this.pendamping_dashboard.pendamping_min_referral;
                this.Referral_max=this.pendamping_dashboard.pendamping_max_referral;
            }
      });
  }

  ajakLainnya(){
    this.asp.go_ajak_gabung_pendamping();
  }
  goSantriList()
  {
    this.asp.go_page_santri_list();
  }
  goStatusPengiriman(){
    this.asp.go_page_pengiriman_status_donasi();
  }
  goPengingat(){
    this.asp.go_page_pengingat_bimbingan(); 
  }
  goPenilaian(){
    this.asp.go_page_daftar_santri_penilaian();
  }

}
