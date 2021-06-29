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
  public error_msg:string="";
  public noNotif:boolean=false;
  public items_read:any=[];
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
        this.setNotRead();
        if (this.notiflist.length==0)
        {
          this.error_msg="Tidak ada notifikasi !";
          this.noNotif=true;
        }
      });       
  }
  goBack(){
    this.route.navigateByUrl('/dashboard-donatur', { replaceUrl:true });
  }
  markAsRead(e)
  {
    /*
    let response:any;
     this.asp.update_pesan_as_read(e.id).then(
       data=> {        
         response=data;  
       })
       */
    if (e.is_selected=="1"){
      e.is_selected="0";
    }
    else{
      e.is_selected="1";
    }
    

  }
  setNotRead(){
    for (var i = 0; i < this.notiflist.length; i++) {
      this.notiflist[i].is_selected="0";
    }
  }
}
