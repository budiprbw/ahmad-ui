import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-santrireg',
  templateUrl: './santrireg.page.html',
  styleUrls: ['./santrireg.page.scss'],
})
export class SantriregPage implements OnInit {
  public user_email : string="";
  public nama_lengkap :string="";
  public error_msg=""; 
  response: any;

  constructor(
    public asp: AhmadproviderService,
    public route : Router
  ) { }

  ngOnInit() {
  }
  gotologinpage(){
    this.route.navigateByUrl('/santrilogin', { replaceUrl:true });
  }
  goBack(){
    this.asp.go_previous_page();
  }
  goRegister(){
    if(this.user_email.trim().length==0)
    {
      this.error_msg="* email required!";
      return;
    }
    if(this.nama_lengkap.trim().length==0){
      this.error_msg="* nama lengkap required!";
      return;
    }     
    this.route.navigate(['santri-buatpassword']);
    /*
    this.asp.presentLoading("register processing");
    this.asp.register_santri(this.user_email,
          this.nama_lengkap).then(
        data=> {        
          
          this.response = data;
              if (this.response.status=='error')
              {
                this.error_msg=this.response.message;
              }          
              else
              {
                this.error_msg="Silahkan cek inbox anda di "+this.user_email+" untuk melanjutkan proses berikutnya";
                this.route.navigate(['confirm-page',{msg:this.error_msg}]);
              }
              this.asp.dismissLoading();
        });*/
    }
  blurEvent1(event: string ){
    if(event.trim().length>0){
      this.error_msg="";
    }    
  }
  blurEvent2(event: string ){
    if(event.trim().length>0){
      this.error_msg="";
    }
  }
  doLogin(){
    
  }

}
