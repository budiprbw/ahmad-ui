import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-pengiriman-status-detail',
  templateUrl: './pengiriman-status-detail.page.html',
  styleUrls: ['./pengiriman-status-detail.page.scss'],
})
export class PengirimanStatusDetailPage implements OnInit {
  public santri_id:string="";
  public nama_santri:string="";
  public deliverydetaillist:any=[];
  constructor(
    private route: Router,
    private router:ActivatedRoute

  ) { }

  ngOnInit() {
    this.santri_id= this.router.snapshot.paramMap.get("santri_id");
    this.nama_santri= this.router.snapshot.paramMap.get("nama_santri");
    this.initialdeliverydetailStatus();
  }
  goBack() {
    this.route.navigateByUrl('/pengiriman-status-donasi', { replaceUrl: true });
    this.initialdeliverydetailStatus();
  }
  initialdeliverydetailStatus(){
    let row1 ={
      "delivery_date": "25/05/2021 - 13:00",
      "delivery_desc": "Paket Dikirimkan",    
    };
    this.deliverydetaillist.push(row1);
    let row2 ={
      "delivery_date": "25/05/2021 - 13:00",
      "delivery_desc": "Paket diinput oleh kurir",    
    };
    this.deliverydetaillist.push(row2);
    let row3 ={
      "delivery_date": "26/05/2021 - 13:00",
      "delivery_desc": "Paket menuju kota tujuan [BOGOR]",    
    };
    this.deliverydetaillist.push(row3);
    let row4 ={
      "delivery_date": "26/05/2021 - 13:00",
      "delivery_desc": "Paket tiba kota tujuan [BOGOR]",    
    };
    this.deliverydetaillist.push(row4);
    let row5 ={
      "delivery_date": "26/05/2021 - 15:00",
      "delivery_desc": "Paket dikirimkan ke alamat penerima",    
    };
    this.deliverydetaillist.push(row5);
    let row6 ={
      "delivery_date": "26/05/2021 - 17:00",
      "delivery_desc": "Paket diterima [Penerima: Keluarga]",    
    };
    this.deliverydetaillist.push(row6);
  }

}
