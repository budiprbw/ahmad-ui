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
 public usrinfo:any=[];
 public donatur_id:any;
 public error_msg:string="";

  constructor(
    private route: Router,
    public asp: AhmadproviderService,
  ) { }

  ngOnInit() {
    this.getUserInfo();
    this.initialJadwalPembayaran();
  }
  goBack(){
    //this.route.navigateByUrl('/pembayaran-donasi', { replaceUrl:true });
    this.asp.go_previous_page();
  }
  getUserInfo(){
    this.usrinfo =  this.asp.getUserInfo();
    this.donatur_id= this.usrinfo.ref_object.id;
  }
  initialJadwalPembayaran(){
    //var item_donasi:any=JSON.parse(localStorage.getItem("item_donasi"));
    this.asp.donasi_cicilan_donaturid( this.donatur_id).then(
      data=> {        
            this.jadwallist=data;
            if (!(JSON.stringify(this.jadwallist) === '{}'))
            {
              this.error_msg = "tidak ada data jadual pembayaran ";
            }
      });
  }

}
