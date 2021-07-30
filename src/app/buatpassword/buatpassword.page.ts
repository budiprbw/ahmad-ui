import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-buatpassword',
  templateUrl: './buatpassword.page.html',
  styleUrls: ['./buatpassword.page.scss'],
})
export class BuatpasswordPage implements OnInit {

  public isActiveToggleTextPassword_1:boolean=true;
  public isActiveToggleTextPassword_2:boolean=true;
  public newpassword:any;
  public confirmassword:any;
  public login_mode:any;
  public user_email:any;
  public user_displayName:any;
  public usrinfo: any;
  public response:any;
  public error_msg:string="";
  public hashcode:any;
  public from_link:boolean=false;
  public user_tipe:any;
  public id_user:any;
  public nama_user:any;
  public email_user:any;
  public login_by:any;

  constructor(
          private route: Router,
           public asp: AhmadproviderService
        ) { }

  ngOnInit() {
      this.usrinfo =this.asp.getUserInfo();
      this.id_user    = this.usrinfo.user_id;
      this.login_mode = this.usrinfo.login_mode;
      this.user_email = this.usrinfo.user_email;
      this.login_by   = this.usrinfo.login_by;
      this.user_displayName = this.usrinfo.user_displayName;
  }
 
  public toggleTextPassword_1(): void {
    this.isActiveToggleTextPassword_1 = (this.isActiveToggleTextPassword_1 == true) ? false : true;
  }
  public toggleTextPassword_2(): void {
    this.isActiveToggleTextPassword_2 = (this.isActiveToggleTextPassword_2 == true) ? false : true;
  }
  public getType_1() {
    return this.isActiveToggleTextPassword_1 ? 'password' : 'text';
  }
  public getType_2() {
    return this.isActiveToggleTextPassword_2 ? 'password' : 'text';
  }
  goBuatpassword(){
    let is_valid:boolean= this.isValid();
    if ( is_valid)      
    {
      this.savePassword();
      this.redirectMe();    
    }    
  }
  isValid():boolean{
    let retval=false;
    if(this.newpassword.trim().length==0)
    {
      this.error_msg="* password required!";      
    }
    else if(this.confirmassword.trim().length==0){
      this.error_msg="* confirmation password required!";
    }     
    else if(this.confirmassword.trim()!=this.newpassword.trim()){
      this.error_msg="* passowrd dan confirmation password tidak sama";
    }
    else{
      retval=true;
    }
    return retval;

  }
  savePassword(){
    if (this.login_by=="google"){
        this.savepasswordGmail();
    }
    if (this.login_by=="data"){
        this.savepassword();
    }
    
  }
  savepassword(){
    this.asp.userChangePassword(this.id_user, this.user_email, this.newpassword,this.user_tipe).then(
      data => {
        this.response = data;
        if (this.response.status == 'error') {
          this.error_msg = this.response.message;              
        }
        else {
            this.redirectMe();
        }
      }); 
  }
  savepasswordGmail(){
    if (this.login_mode=="santri"){
      this.asp.santriRegGmail(this.user_email,this.user_displayName).then(
        data => {
          this.response = data;
          if (this.response.status == 'error') {
            this.error_msg = this.response.message;              
          }
          else {
              this.redirectMe();
          }
        }); 
    }    
    if (this.login_mode=="donatur"){
      this.asp.donaturRegGmail(this.user_email,this.user_displayName).then(
        data => {
          this.response = data;
          if (this.response.status == 'error') {
            this.error_msg = this.response.message;              
          }
          else {
              this.redirectMe();
          }
        }); 
    }
  }
  redirectMe()
  {
    if (this.login_mode=="santri"){
      let mode=localStorage.getItem("mode");
      if (mode=="tabakunsantri")
      {
        this.asp.go_previous_page();
      }
      else{
        this.route.navigate(['santri-kuesioner']);
      }
        
    }
    if (this.login_mode=="donatur"){
      var item_donasi:any=JSON.parse(localStorage.getItem("item_donasi"));
      if (item_donasi) {
        this.route.navigateByUrl('/pembayaran-donasi', { replaceUrl: true });
      }     
      else{
       this.asp.go_page_donatur_profile();  
      }
    }              
    if( this.login_mode=="pendamping"){      
      this.route.navigateByUrl('/dashboard-pendamping/tabakunpendamping');
    }
  }
  goBack(){
   this.redirectMe();
  }

}

