import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-donasi-santri',
  templateUrl: './donasi-santri.page.html',
  styleUrls: ['./donasi-santri.page.scss'],
})
export class DonasiSantriPage implements OnInit {
  public donatur_id:any;
  public santrilist:any=[];
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
    this.donasiSantri();
  }
  donasiSantri(){
    this.asp.donasi_cicilan_donaturid( this.donatur_id).then(
      data=> {        
            let result:any;
            result =data;
            this.santrilist= result.data;
            if (this.santrilist.length === 0)
            {
              this.error_msg = "tidak ada data ";
            }            
      });
  }
  goBack(){
    this.asp.go_previous_page();
  }
  goDetailSantri(v){
    this.route.navigate(['donasi-santri-list', { donasi_id: v.id }]);
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
