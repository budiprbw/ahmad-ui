import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
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


  constructor(private route: Router,
          public asp: AhmadproviderService,
          public router:ActivatedRoute
        ) { }

  ngOnInit() {
    this.is_from_link();
    if (!this.from_link){
        this.usrinfo =  this.usrinfo= this.asp.getUserInfo();
        this.login_mode = this.usrinfo.login_mode;
        this.user_email = this.usrinfo.user_email;
        this.user_displayName = this.usrinfo.user_displayName;
    }  
  }
  is_from_link(){
    this.router.params.subscribe((params: any) => {
      if (params['idreg']){
        this.hashcode=params['idreg'];
        console.log(this.hashcode);
        this.from_link=true;        
        this.asp.user_by_hashcode(this.hashcode).then(
          data => {
            this.response = data;
            if (this.response.status == 'error') {
              this.route.navigate(['confirm-page', { msg: this.response.message }]);        
            }
            this.id_user= this.response.data.id;  
            this.user_displayName= this.response.data.name;
            this.user_email= this.response.data.email;
            this.user_tipe= this.response.data.tipe; //1 :donatur, 2:santri            
            if (this.user_tipe=="1") this.login_mode="donatur";
            if (this.user_tipe=="2") this.login_mode="santri";

            this.asp.removeUserInfo();
            let userinfo = {
              "user_email": this.user_email,
              "user_displayName": this.user_displayName,
              "user_photoURL": "",
              "login_by":"data",
              "login_mode":this.login_mode
            };
            this.asp.setUserInfo(userinfo);
          }); 
      }       
    });
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
    if (!this.from_link){
        this.savepasswordSosmed();
    }
    if (this.from_link){
        this.savepasswordfromLink();
    }
    
  }
  savepasswordfromLink(){
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
  savepasswordSosmed(){
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
