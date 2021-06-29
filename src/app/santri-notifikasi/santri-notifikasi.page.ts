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
  public error_msg:string="";
  public noNotif:boolean=false;
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
    this.asp.user_pesan_aktif(this.santri_id).then(
      data=> {        
        this.notiflist=data;
        if (this.notiflist.length==0)
        {
          this.error_msg="Tidak ada notifikasi !";
          this.noNotif=true;
        }
      });     
  }
  goBack(){
    this.route.navigateByUrl('/dashboard-santri', { replaceUrl:true });
  }
  
  
}

