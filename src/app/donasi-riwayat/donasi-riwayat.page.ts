import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';


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
    var item_donasi:any=JSON.parse(localStorage.getItem("item_donasi"));
    if (item_donasi)
    {
      this.riwayatlist.push(item_donasi.donasi);
      this.total_paket = this.asp.format_number(item_donasi.donasi_jumlah_santri);
      this.total_harga = this.asp.format_number(item_donasi.donasi_total_harga);
      this.donasi_cara_bayar= this.caraBayarCode(item_donasi.donasi_cara_bayar,item_donasi.donasi_tagih);
    }
  }
  goBack(){
    //this.route.navigateByUrl('/dashboard-donatur', { replaceUrl:true });
    this.asp.go_previous_page();
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

  caraBayarCode(str,nominal){
    var cara_bayar:string="";
    switch (str) {
      case "1":
        cara_bayar="Donasi Harian (Rp."+ this.asp.format_number(nominal)  +")";
        break;
      case "2":
        cara_bayar="Donasi Pekanan (Rp."+ this.asp.format_number(nominal)  +")";
        break;
      case "3":
        cara_bayar="Donasi Bulanan (Rp."+ this.asp.format_number(nominal)  +")";
        break;
      case "4":
        cara_bayar="Donasi Penuh (Rp."+ this.asp.format_number(nominal)  +")";
        break;
    }
    return cara_bayar;
  }
}
