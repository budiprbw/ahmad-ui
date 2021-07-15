import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-ajak-gabung',
  templateUrl: './ajak-gabung.page.html',
  styleUrls: ['./ajak-gabung.page.scss'],
})
export class AjakGabungPage implements OnInit {
  public no_telepon:string;
  public usrinfo:any;
  public donatur_id:any;
  public donatur_kode:any;
  public error_msg:string="";

  constructor(
    private asp:AhmadproviderService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }
  goBack(){
    this.asp.go_previous_page();
  }
  getUserInfo(){
      this.usrinfo = this.asp.getUserInfo();
      this.donatur_id  = this.usrinfo.user_id;
      this.donatur_kode = this.usrinfo.ref_object.donatur_kode;
  }
  goAjak(){    
    this.asp.presentLoading("Sending");
    this.asp.referal_send_link(this.donatur_kode, this.no_telepon).then(res=>{
      let retval:any;
      retval= res;
      if (retval.status=='error'){
        this.error_msg
      }
      else
        {
          this.asp.presentToast("referal berhasil dikirim");
        }
    })
    this.asp.dismissLoading();    
  }
  

}
