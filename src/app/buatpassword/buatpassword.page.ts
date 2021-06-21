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

  constructor(private route: Router,public asp: AhmadproviderService) { }

  ngOnInit() {
    this.usrinfo =  this.usrinfo= this.asp.getUserInfo();
    this.login_mode = this.usrinfo.login_mode;
    this.user_email = this.usrinfo.user_email;
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
    if (this.login_mode=="santri"){
      this.asp.santriRegSosmed(this.user_email,this.user_displayName, this.newpassword).then(
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
      this.asp.donaturRegSosmed(this.user_email,this.user_displayName, this.newpassword).then(
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
      this.route.navigate(['santri-kuesioner']);
    }
    if (this.login_mode=="donatur"){
      this.route.navigate(['donatur-profile']);
    }          
  }
  goBack(){
    this.route.navigate(['webdashboard']);
  }

}
