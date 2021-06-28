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
    this.asp.user_pesan_aktif(this.donatur_id).then(
      data=> {        
        this.notiflist=data;
      });       
  }
  goBack(){
    this.route.navigateByUrl('/dashboard-donatur', { replaceUrl:true });
  }
}
