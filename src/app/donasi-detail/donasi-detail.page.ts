import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-donasi-detail',
  templateUrl: './donasi-detail.page.html',
  styleUrls: ['./donasi-detail.page.scss'],
})
export class DonasiDetailPage implements OnInit {
  public riwayat_id:string="";
  public riwayatdetaillist:any=[];
  constructor( 
    private router: ActivatedRoute,
    private route : Router,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.riwayat_id= this.router.snapshot.paramMap.get("riwayat_id");
    this.initialdetailriwayat();

  }
  initialdetailriwayat(){
    let row1 ={
      "riwayat_status":"penuh",
      "riwayat_detail_date": "2021-06-01",
      "riwayat_detail_desc": "Donasi Penuh",    
    };
    this.riwayatdetaillist.push(row1);
    let row2 ={
      "riwayat_status":"cicil",
      "riwayat_detail_date": "2021-07-01",
      "riwayat_detail_desc": "Pembayaran Donasi 1 (Rp10.000)",    
    };
    this.riwayatdetaillist.push(row2);
    let row3 ={
      "riwayat_status":"cicil",
      "riwayat_detail_date": "2021-08-01",
      "riwayat_detail_desc": "Pembayaran Donasi 2 (Rp10.000)",    
    };
    this.riwayatdetaillist.push(row3);
    let row4 ={
      "riwayat_status":"cicil",
      "riwayat_detail_date": "2021-09-01",
      "riwayat_detail_desc": "Pembayaran Donasi 4 (Rp10.000)",    
    };
    this.riwayatdetaillist.push(row4);
    let row5 ={
      "riwayat_status":"cicil",
      "riwayat_detail_date": "2021-09-01",
      "riwayat_detail_desc": "Pembayaran Donasi 5 (Rp10.000)",    
    };
    this.riwayatdetaillist.push(row5);
  }
  goBack(){
    this.route.navigateByUrl('/donasi-riwayat', { replaceUrl:true });
  }  
}
