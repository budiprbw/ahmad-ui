import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-tabprogram',
  templateUrl: './tabprogram.page.html',
  styleUrls: ['./tabprogram.page.scss'],
})
export class TabprogramPage implements OnInit {
  public line_data_lembaga:any=[];
  public adaDonasi:boolean=false;
  public donatur_id:any;
  public riwayatlist:any=[];
  public usrinfo:any;

  constructor(
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.viewUser();
    this.getDataLembaga();
    this.cekDonasi();
  }
  viewUser(){
    this.usrinfo =  this.asp.getUserInfo();
    this.donatur_id= this.usrinfo.ref_object.id;
  }

  async getDataLembaga(){
    await this.asp.get_lembaga().then(
      data=> {        
            this.line_data_lembaga=data;            
      });
  }
  async cekDonasi(){
    this.asp.donasi_cicilan_donaturid( this.donatur_id).then(
      data=> {        
            let result:any;
            result =data;
            this.riwayatlist= result.data;
            this.adaDonasi=false;
            if (this.riwayatlist.length > 0)
            {
              this.adaDonasi=true;
            }            
      });
  }
  goRiwayat(){
    this.asp.go_page_donasi_riwayat();
  }
  goListPenerimaDonasi(){
    this.asp.go_page_santri_list();
  }
  goStatusPengiriman(){
    this.asp.go_page_pengiriman_status_donasi();
  }
  goSalurkanDonasi(){
    this.asp.go_page_salurkan_donasi();
  }
  html_entity(val){
    return this.asp.html_entity(val);
  }
 
}
