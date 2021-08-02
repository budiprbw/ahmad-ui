import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-ajak-gabung',
  templateUrl: './ajak-gabung.page.html',
  styleUrls: ['./ajak-gabung.page.scss'],
})
export class AjakGabungPage implements OnInit {
  public no_telepon:string="";
  public usrinfo:any; 
  public referal_kode:any;
  public error_msg:string="";
  public login_mode:string="";
  public user_tipe: string="";
  public isPendamping:boolean=false;
  public tipe_gabung:string="";

  constructor(
    private asp:AhmadproviderService,
    public router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }
  goBack(){
    this.asp.go_previous_page();
  }
  getUserInfo(){
      this.usrinfo = this.asp.getUserInfo();      
      this.router.queryParams.subscribe((params: any) => {
        if (params['mode']) {
          this.login_mode = params['mode'];
          switch (this.login_mode) {
            case 'donatur':
              this.user_tipe = "1";
              this.referal_kode = this.usrinfo.ref_object.donatur_kode;
              break;
            case 'santri':
              this.user_tipe = "2";
              this.referal_kode = this.usrinfo.ref_object.santri_kode;
              break;
            case 'pendamping':
              //this.user_tipe = "3";
              this.referal_kode = this.usrinfo.ref_object.pendamping_kode;
              this.isPendamping=true;
              break; 
          }
        }
      })  

  }
  async goAjak(){    
    if (this.  validateInput()){
        this.asp.presentLoading("Sending");
        if ( this.isPendamping) this.user_tipe=this.tipe_gabung;
        await this.asp.referal_send_link(this.referal_kode, this.no_telepon, this.user_tipe).then(res=>{
          let retval:any;
          retval= res;
          if (retval.status=='error'){
            this.error_msg;
          }
          else
            {
              this.asp.presentToast("referal berhasil dikirim");
              this.asp.go_previous_page();
            }
          })
          this.asp.dismissLoading();    
      }
  }
  validateInput(){
    let retVal:boolean=false;
    let msg="";
    var newLine = "<br>"
    if ( this.no_telepon=="")  msg+= newLine +"*No hp";
    if ( this.isPendamping  && this.tipe_gabung=="") msg+= newLine +"*Bergabung Sebagai";
    if (msg!="")
    {
      msg="Silahkan check inputan" +msg;
      
    }
    else{
      retVal=true;
    }
    this.error_msg=msg;
    return retVal;
  }

  html_entity(val){
    return this.asp.html_entity(val);
  }
  

}
