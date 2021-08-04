import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-daftar-santri-penilaian',
  templateUrl: './daftar-santri-penilaian.page.html',
  styleUrls: ['./daftar-santri-penilaian.page.scss'],
})
export class DaftarSantriPenilaianPage implements OnInit {
  public noProgram: any = true;
  public usrinfo: any;
  public user_email: string = "";
  public user_displayName: string = ""
  public santrilist: any;
  public pendamping_id: string = "";
  public error_msg:string="";
  public total_santri:any=0;
  public santri_list_title:string=""


  constructor(
    public asp: AhmadproviderService,
  ) { }

  ngOnInit() {
    this.initpage();
  }
  initpage() {

    this.viewUser();
    this.getSantri();
  }
  viewUser() {
    this.usrinfo = this.asp.getUserInfo();
    this.pendamping_id = this.usrinfo.ref_object.id;
    this.user_email = this.usrinfo.user_email;
    this.user_displayName = this.usrinfo.user_displayName;
    this.santri_list_title="Total Santri Dalam Penilaian"
  }
  async getSantri() {
    await this.asp.santri_by_pendampingId(this.pendamping_id).then(
      data => {
        let result: any;
        result = data;
        if (result.length > 0) {
          this.santrilist = result[0].santri;
          this.total_santri=this.santrilist.length;
          if (this.santrilist.length == 0) {
            this.error_msg="Belum ada santri yang memerlukan bimbingan ";
          }
        }
        else {
          this.error_msg="Belum ada santri yang memerlukan bimbingan ";
        }
      });
  }
  goLihatDetail(item) {
    this.asp.go_page_penilaian_santri(item.id, this.pendamping_id);
  }
  getPhoto(item){
    if (item.santri_lokasi_photo==null){
      return "assets/images/no-image.png";
    }
    else
    {
      return item.santri_lokasi_photo;  
    }
  }
  goBack(){
    this.asp.go_previous_page();
  }
}
