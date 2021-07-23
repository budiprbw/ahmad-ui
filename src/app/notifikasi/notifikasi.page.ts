import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-notifikasi',
  templateUrl: './notifikasi.page.html',
  styleUrls: ['./notifikasi.page.scss'],
})
export class NotifikasiPage implements OnInit {
  public user_id:any;
  public notiflist:any=[];
  public usrinfo:any;
  public error_msg:string="";
  public noNotif:boolean=false;
  public mark_options:any;  

  constructor(
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.initNotif();
  }
  initNotif(){
    this.usrinfo =this.asp.getUserInfo();
    this.user_id  = this.usrinfo.user_id;
    this.getNotif();
  }
  async getNotif(){
    await this.asp.user_pesan_aktif(this.user_id).then(
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
    this.asp.go_previous_page();
  }
  markAsRead(e)
  {      
    if (e.is_selected=="0"){
      e.is_selected="1";
    }
    else{
      e.is_selected="0";
    }    

  }
  setNotRead(){
    for (var i = 0; i < this.notiflist.length; i++) {
      this.notiflist[i].is_selected="1";
    }
  }
  setMarkOption(){
  for (var i = 0; i < this.notiflist.length; i++) {
      if (this.mark_options=="1"){
              // mark as read
        if (this.notiflist[i].is_selected=="0")
        {
            this.update_read(this.notiflist[i].id);
        }  
      }
      if (this.mark_options=="2")
      {
        // remove
        if (this.notiflist[i].is_selected=="0")
        {
            this.delete_pesan(this.notiflist[i].id);
        }  
      }      
    }
    this.getNotif();    
    this.mark_options="";
  }
  async update_read(id)
  {
    let response:any;
    await this.asp.update_pesan_as_read(id).then(
      data=> {        
        response=data;  
      })
  }
  async delete_pesan(id)
  {
    let response:any;
    await this.asp.delete_pesan(id).then(
      data=> {        
        response=data;                  
      })
  }

}
