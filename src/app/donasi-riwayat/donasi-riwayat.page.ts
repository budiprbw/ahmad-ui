import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';


@Component({
  selector: 'app-donasi-riwayat',
  templateUrl: './donasi-riwayat.page.html',
  styleUrls: ['./donasi-riwayat.page.scss'],
})
export class DonasiRiwayatPage implements OnInit {
  public donatur_id:any;
  public riwayatlist:any=[];
  constructor(
    private router: ActivatedRoute,
    private route : Router,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.donatur_id= this.router.snapshot.paramMap.get("donatur_id");
    this.initialdatariwayat();
  }
  initialdatariwayat(){
    let row1 ={
      "riwayat_id":1,
      "riwayat_date": "2021-06-01",
      "riwayat_title": "10 Paket Donasi (Rp8.000.000)",
      "riwayat_status": "selesai",
      "riwayat_desc": "Donasi Penuh",    
    };
    this.riwayatlist.push(row1);
    let row2 ={
      "riwayat_id":2,
      "riwayat_date": "2021-07-01",
      "riwayat_title": "10 Paket Donasi (Rp8.000.000)",
      "riwayat_status": "Aktif  -",
      "riwayat_desc": "Donasi Harian (Rp10.000)",    
    };
    this.riwayatlist.push(row2);
  }
  goBack(){
    this.route.navigateByUrl('/dashboard-donatur', { replaceUrl:true });
  }
  goDetailRiwayat(id){
    this.route.navigate(['donasi-detail', { riwayat_id: id }]);
  }
}
