import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-santri-notifikasi',
  templateUrl: './santri-notifikasi.page.html',
  styleUrls: ['./santri-notifikasi.page.scss'],
})
export class SantriNotifikasiPage implements OnInit {
  public notiflist:any=[];
  public santri_id:string="";
  constructor(
    private router: ActivatedRoute,
    private route : Router,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.santri_id= this.router.snapshot.paramMap.get("santri_id");
    this.initialdatNOtif();
  }
  initialdatNOtif(){
    let row1 ={
      "notif_date": "2021-06-01",
      "notif_desc": "Akun anda sudah kami masukkan kedalam list penerima donasi program AHMaD Project",    
    };
    this.notiflist.push(row1);
    let row2 ={
      "notif_date": "2021-06-02",
      "notif_desc": "Selamat anda terpilih menerima paket donasi pembelajaran AHMaD Project, ayo mulai belajar",    
    };
    this.notiflist.push(row2);
    let row3 ={
      "notif_date": "2021-06-03",
      "notif_desc": "Pendamping anda mengirim form evaluasi, mohon segera lengkapi",    
    };
    this.notiflist.push(row3);
  }
  goBack(){
    this.route.navigateByUrl('/dashboard-santri', { replaceUrl:true });
  }
  
  
}
