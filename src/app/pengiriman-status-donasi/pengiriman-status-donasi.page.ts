import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-pengiriman-status-donasi',
  templateUrl: './pengiriman-status-donasi.page.html',
  styleUrls: ['./pengiriman-status-donasi.page.scss'],
})
export class PengirimanStatusDonasiPage implements OnInit {
  public deliverylist: any = [];
  public pendamping_id:any;
  public donatur_id:any;
  public usrinfo:any;

  constructor(
    public asp: AhmadproviderService,
    public route: Router
  ) { }

  ngOnInit() {
    this.usrinfo =  this.asp.getUserInfo();
    this.initialDeliveryStatus();
  }
  goBack() {
    this.asp.go_previous_page();    
  }
  initialDeliveryStatus() {
    if (this.usrinfo.login_mode=="donatur")
    {
      this.donatur_id= this.usrinfo.ref_object.id;
      this.asp.bimbingan_list_santri_bydonaturid(this.donatur_id).then(
        data=> {        
              let result:any;
              result =data;                         
              if (result.data.length > 0)
              {
                    for(let i =0; i <= result.data.length-1; i++) {
                      let santri_lokasi_photo="assets/images/no-image.png";
                      if ( result.data[i].santri.santri_lokasi_photo!=null) santri_lokasi_photo= result.data[i].santri.santri_lokasi_photo;
                      let status_pengiriman:string="";

                      if (result.data[i].santri.kirimproduk.kirim_status=="1"){
                        status_pengiriman="Dalam Pengiriman"
                      }
                      if (result.data[i].santri.kirimproduk.kirim_status=="2"){
                        status_pengiriman="Sudah Diterima"
                      }              
                      let row1 = {
                        "santri_id": result.data[i].santri.id,
                        "photo_url":  santri_lokasi_photo,
                        "nama_santri": result.data[i].santri.santri_nama,
                        "status": status_pengiriman,
                      };
                      this.deliverylist.push(row1);
                    }
              } 
        });
    }
    if (this.usrinfo.login_mode=="pendamping")
    {
      this.pendamping_id= this.usrinfo.ref_object.id;
      this.asp.santri_by_pendampingId(this.pendamping_id).then(
        data => {
          let result: any;
          result = data;
          if (result[0].santri.length > 0) {
            for(let i =0; i <= result[0].santri.length-1; i++) {
              let santri_lokasi_photo="assets/images/no-image.png";
              if ( result[0].santri[i].santri_lokasi_photo!=null) santri_lokasi_photo= result[0].santri[i].santri_lokasi_photo;
              let status_pengiriman:string="";

              if (result[0].santri[i].kirimproduk.kirim_status=="1"){
                status_pengiriman="Dalam Pengiriman"
              }
              if (result[0].santri[i].kirimproduk.kirim_status=="2"){
                status_pengiriman="Sudah Diterima"
              }

              let row1 = {
                "santri_id": result[0].santri[i].id,
                "photo_url": santri_lokasi_photo,
                "nama_santri": result[0].santri[i].santri_nama,
                "status": status_pengiriman,
              };
              this.deliverylist.push(row1);                
            }
          }            
        });
    }
    
  }
  goDetailDOnasi(item){
    this.route.navigate(['pengiriman-status-detail', { santri_id: item.santri_id,nama_santri:item.nama_santri }]);
  }
}

