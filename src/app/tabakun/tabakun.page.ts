import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-tabakun',
  templateUrl: './tabakun.page.html',
  styleUrls: ['./tabakun.page.scss'],
})
export class TabakunPage implements OnInit {
  public user_photoURL:any;
  public usrinfo: any;
  public user_email: string = "";
  public user_displayName: string = "";
  public login_by: string = "";
  public donatur_id: string;
  public donaturData:any;

  constructor(
    private router: ActivatedRoute,
    private route : Router,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.userInfo();
    this.getDonatur();
  }
  userInfo() {
    this.usrinfo =  this.usrinfo= this.asp.getUserInfo();
    this.user_photoURL = this.usrinfo.user_photoURL;
    this.user_email = this.usrinfo.user_email;
    this.user_displayName = this.usrinfo.user_displayName;
    this.login_by = this.usrinfo.login_by;
  }
  getDonatur(){
    this.asp.login_donatur(this.user_email).then(
      data => {
        this.donaturData = data;
        this.donatur_id= this.donaturData.id;
        this.user_photoURL= this.donaturData.donatur_lokasi_photo;
        console.log( this.donaturData);
       
      });
  }
  goAjak(){

  }
  goProfile(){
    this.route.navigateByUrl('/donatur-profile', { replaceUrl:true });
  }
  goUbahPassword(){
    
  }
  goInfoMasuk(){

  }

}
