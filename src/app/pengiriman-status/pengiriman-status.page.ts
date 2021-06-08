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
  constructor(
    public asp: AhmadproviderService,
    public route : Router
  ) { }

  ngOnInit() {
    this.initialDeliveryStatus();
  }
  goBack(){
    this.route.navigateByUrl('/santri-program', { replaceUrl: true });    
  } 
  initialDeliveryStatus(){
    let row1 ={
      "delivery_date": "2021-06-01",
      "delivery_desc": "Paket dikirimkan ",    
    };
    this.deliverylist.push(row1);
    let row2 ={
      "delivery_date": "2021-06-02",
      "delivery_desc": "Paket diinput oleh kurir",    
    };
    this.deliverylist.push(row2);
    let row3 ={
      "delivery_date": "2021-06-03",
      "delivery_desc": "Paket menuju kota tujuan [BOGOR]",    
    };
    this.deliverylist.push(row3);
  }
}
