import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-pengiriman-status',
  templateUrl: './pengiriman-status.page.html',
  styleUrls: ['./pengiriman-status.page.scss'],
})
export class PengirimanStatusPage implements OnInit {
  public deliverylist:any=[];
  public usrinfo:any;
  public santri_id:string="";

  constructor(
    public asp: AhmadproviderService,
    public route : Router
  ) { }

  ngOnInit() {
    this.userInfo();
    this.initialDeliveryStatus();
  }
  goBack(){
    this.asp.go_previous_page();
  } 
  async userInfo() {
    this.usrinfo = this.asp.getUserInfo();
    this.santri_id= this.usrinfo.ref_object.id;
  }
  async initialDeliveryStatus(){  
    await this.asp.santri_lacak_produk(this.santri_id).then(
      data => {
        let result:any =data
        this.deliverylist = result.manifest;                        
      });        
  }
}
