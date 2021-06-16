import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-pengiriman-status-donasi',
  templateUrl: './pengiriman-status-donasi.page.html',
  styleUrls: ['./pengiriman-status-donasi.page.scss'],
})
export class PengirimanStatusDonasiPage implements OnInit {
  public deliverylist: any = [];
  constructor(
    public asp: AhmadproviderService,
    public route: Router
  ) { }

  ngOnInit() {
    this.initialDeliveryStatus();
  }
  goBack() {
    this.route.navigateByUrl('/dashboard-donatur/tabprogram', { replaceUrl: true });
    
  }
  initialDeliveryStatus() {
    let row1 = {
      "photo_url": "assets/images/no-image.png",
      "nama_santri": "Abdullah Nasir",
      "status": "Dalam Pengiriman",
    };
    this.deliverylist.push(row1);
    let row2 = {
      "santri_id": 1,
      "photo_url": "assets/images/no-image.png",
      "nama_santri": "Amin",
      "status": "Terkirim ",
    };
    this.deliverylist.push(row2);
    let row3 = {
      "santri_id": 2,
      "photo_url": "assets/images/no-image.png",
      "nama_santri": "Darso",
      "status": "Dalam Pengiriman ",
    };
    this.deliverylist.push(row3);
    let row4 = {
      "santri_id": 3,
      "photo_url": "assets/images/no-image.png",
      "nama_santri": "Asep",
      "status": "Dalam Pengiriman ",
    };
    this.deliverylist.push(row4);
    let row5 = {
      "santri_id": 3,
      "photo_url": "assets/images/no-image.png",
      "nama_santri": "Sholeh",
      "status": "Dalam Pengiriman ",
    };
    this.deliverylist.push(row5);
  }
  goDetailDOnasi(item){
    this.route.navigate(['pengiriman-status-detail', { santri_id: item.santri_id,nama_santri:item.nama_santri }]);
  }
}

