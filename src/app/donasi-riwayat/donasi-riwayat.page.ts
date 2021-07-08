import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import { formatNumber } from '@angular/common';


@Component({
  selector: 'app-donasi-riwayat',
  templateUrl: './donasi-riwayat.page.html',
  styleUrls: ['./donasi-riwayat.page.scss'],
})
export class DonasiRiwayatPage implements OnInit {
  public donatur_id:any;
  public riwayatlist:any=[];
  public usrinfo:any;
  public total_paket:any;
  public total_harga:any;
  public donasi_cara_bayar:string="";
  public error_msg:string="";

  constructor(
      private router: ActivatedRoute,
      private route : Router,
      public asp: AhmadproviderService
  ) { }

  ngOnInit() {    
    this.usrinfo =  this.asp.getUserInfo();
    this.donatur_id= this.usrinfo.ref_object.id;
    this.initialdatariwayat();
  }
  initialdatariwayat(){
    this.asp.donasi_cicilan_donaturid( this.donatur_id).then(
      data=> {        
            let result:any;
            result =data;
            this.riwayatlist= result.data;
            if (this.riwayatlist.length === 0)
            {
              this.error_msg = "tidak ada data jadual pembayaran ";
            }            
      });
  }
  goBack(){
    this.route.navigateByUrl('/dashboard-donatur', { replaceUrl:true });
    //this.asp.go_previous_page();
  }
  goDetailRiwayat(v){
    //this.route.navigate(['donasi-detail', { donasi_id: v.id }]);
    let navigationExtras: NavigationExtras = {
      state: {
        cicilan: v.cicilan
      }
    };
    this.route.navigate(['donasi-detail'], navigationExtras);
  }

  caraBayarCode(str){
    var cara_bayar:string="";
    switch (str) {
      case "1":
        cara_bayar="Donasi Harian ";
        break;
      case "2":
        cara_bayar="Donasi Pekanan";
        break;
      case "3":
        cara_bayar="Donasi Bulanan";
        break;
      case "4":
        cara_bayar="Donasi Penuh ";
        break;
    }
    return cara_bayar;
  }

  format_number(val)
  {
    return this.asp.format_number(val);
  }
}
