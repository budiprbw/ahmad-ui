import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';


@Component({
  selector: 'app-jadual-pembayaran-donasi',
  templateUrl: './jadual-pembayaran-donasi.page.html',
  styleUrls: ['./jadual-pembayaran-donasi.page.scss'],
})
export class JadualPembayaranDonasiPage implements OnInit {
 public jadwallist:any=[];
  constructor(
    private route: Router,
    public asp: AhmadproviderService,
  ) { }

  ngOnInit() {
    this.initialJadwalPembayaran();
  }
  goBack(){
    this.asp.go_previous_page();
  }
  initialJadwalPembayaran(){
    let row1 ={
      "jadwal_date": "25/05/2021 - 13 Syawal 1442",
      "jadwal_desc": "Transaksi Donasi Dilakukan",    
    };
    this.jadwallist.push(row1);
    let row2 ={ 
      "jadwal_date": "25/05/2021 - 13 Syawal 1442 ",
      "jadwal_desc": "Pembayaran Donasi 1 (Rp10.000)",    
    };
    this.jadwallist.push(row2);
    let row3 ={
      "jadwal_date": "21/06/2021 - 11 Dzulqaidah 1442 ",
      "jadwal_desc": "Pembayaran Donasi 2 (Rp10.000)",    
    };
    this.jadwallist.push(row3);
    let row4 ={
      "jadwal_date": "21/07/2021 - 11 Dzulhijah 1442",
      "jadwal_desc": "Pembayaran Donasi 3 (Rp10.000)",    
    };
    this.jadwallist.push(row4);
    let row5 ={
      "jadwal_date": "20/08/2021 - 11 Muharam 1443",
      "jadwal_desc": "Pembayaran Donasi 4 (Rp10.000)",    
    };
    this.jadwallist.push(row5);
  }

}
