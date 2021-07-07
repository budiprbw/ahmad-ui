import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-selesai-donasi',
  templateUrl: './selesai-donasi.page.html',
  styleUrls: ['./selesai-donasi.page.scss'],
})
export class SelesaiDonasiPage implements OnInit {
  public usrinfo:any;
  public user_email:string="";
  constructor(
    public asp: AhmadproviderService,
    public route : Router
  ) { }

  ngOnInit() {
    this.usrinfo =  this.asp.getUserInfo();   
    this.user_email = this.usrinfo.user_email;

    //this.asp.removeItemDonasi();
    //this.asp.removeUserInfo();
  }
  goBack(){
    //this.route.navigateByUrl('/penyaluran-donasi', { replaceUrl:true });
    this.asp.go_previous_page();
  }
  goLanjutkan(){
    this.route.navigateByUrl('/pengingat-donasi');
  }
}
