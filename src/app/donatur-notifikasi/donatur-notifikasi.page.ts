import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-donatur-notifikasi',
  templateUrl: './donatur-notifikasi.page.html',
  styleUrls: ['./donatur-notifikasi.page.scss'],
})
export class DonaturNotifikasiPage implements OnInit {
  public donatur_id:any;
  public notiflist:any=[];
  constructor(
    private router: ActivatedRoute,
    private route : Router,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.donatur_id= this.router.snapshot.paramMap.get("donatur_id");
    this.initialdataNotif();
  }
  initialdataNotif(){
    let row1 ={
      "notif_date": "2021-06-01",
      "notif_desc": "Pembayaran pembelian 10 paket donasi anda berhasil kami verifikasi",    
    };
    this.notiflist.push(row1);
    let row2 ={
      "notif_date": "2021-06-02",
      "notif_desc": "Pembayaran anda untuk 10 paket donasi sedang dalam verifikasi",    
    };
    this.notiflist.push(row2);
    let row3 ={
      "notif_date": "2021-06-03",
      "notif_desc": "Paket anda sudah diterima oleh Nama Santri",    
    };
    this.notiflist.push(row3);
  }
  goBack(){
    this.route.navigateByUrl('/dashboard-donatur', { replaceUrl:true });
  }
}
