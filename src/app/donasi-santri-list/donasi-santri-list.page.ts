import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-donasi-santri-list',
  templateUrl: './donasi-santri-list.page.html',
  styleUrls: ['./donasi-santri-list.page.scss'],
})
export class DonasiSantriListPage implements OnInit {
  public santrilist: any = [];
  public total_santri:any=0;
  constructor(
    public asp: AhmadproviderService,
    public route: Router

  ) { }

  ngOnInit() {
    this.initialSantriList();
  }
  
  initialSantriList(){
    let row1 = {
      "santri_id": 1,
      "photo_url": "../assets/images/no-image.png",
      "nama_santri": "Abdullah Nasir",
      "nama_prgram": "Progress Pembelajaran",
      "pencapaian": "40%",
    };
    this.santrilist.push(row1);
    let row2 = {
      "santri_id": 2,
      "photo_url": "../assets/images/no-image.png",
      "nama_santri": "Amin",
      "nama_prgram": "Progress Pembelajaran ",
      "pencapaian": "30%",
    };
    this.santrilist.push(row2);
    let row3 = {
      "santri_id": 3,
      "photo_url": "../assets/images/no-image.png",
      "nama_santri": "Darso",
      "nama_prgram": "Progress Pembelajaran ",
      "pencapaian": "90%",
    };
    this.santrilist.push(row3);
    let row4 = {
      "santri_id": 4,
      "photo_url": "../assets/images/no-image.png",
      "nama_santri": "Asep",
      "nama_prgram": "Progress Pembelajaran ",
      "pencapaian": "78%",
    };
    this.santrilist.push(row4);
    let row5 = {
      "santri_id": 5,
      "photo_url": "../assets/images/no-image.png",
      "nama_santri": "Sholeh",
      "nama_prgram": "Dalam Pengiriman ",
    };
    this.santrilist.push(row5);
    this.total_santri =this.santrilist.length;
  }
  goBack(){
    this.route.navigateByUrl('/donasi-program', { replaceUrl: true });
  }
  goDetailPenerima(item){
    this.route.navigate(['detail-penerima-donasi', { santri_id: item.santri_id,nama_santri:item.nama_santri }]);

  }
}
