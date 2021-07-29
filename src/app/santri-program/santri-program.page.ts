import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
@Component({
  selector: 'app-santri-program',
  templateUrl: './santri-program.page.html',
  styleUrls: ['./santri-program.page.scss'],
})
export class SantriProgramPage implements OnInit {
 public noProgram:any=true;
 public programlist:any=[];
 public nama_donatur:string="";
 public nama_pendamping:string="";
 public bulan_pendampingan:any="";
 public progress_belajar:any="";
 public santri_id:any;
 public usrinfo:any;
 public santri_status_text="";

  constructor(
    public asp: AhmadproviderService,
    public route : Router
  ) { }

  ngOnInit() {
    this.viewUser();
    this.getSantri();
    this.getNamaDonatur();
    this.getNamaPendamping();
    this.initialsantriprogram();
    this.getsantriDashboard()
    // this.bulan_pendampingan="0.70";
    // this.progress_belajar="0.92";
  }
  viewUser(){
    this.usrinfo = this.asp.getUserInfo();
    this.santri_id  = this.usrinfo.ref_object.id;
  }
  async getsantriDashboard(){
    await this.asp.santri_dashboard(this.santri_id).then(data=>{
        let retval:any=data;
        this.progress_belajar=retval.data.santri_progress_belajar;
        this.bulan_pendampingan=retval.data.santri_progress_waktu;
    })
  }
  async getSantri(){
    await this.asp.santri_byid(this.santri_id).then(
      data => {
          let result:any = data;
          switch( result.santri_status)
          {
              case "4":
              this.santri_status_text="menunggu produk";
              break;
              case "5":
              this.santri_status_text="Sudah terpilih oleh donatur,menunggu produk";
              break;
              case "6":
              this.santri_status_text="Dalam bimbingan";
              break;
              case "7":
              this.santri_status_text="Sudah lulus";
              break;
          }
          
      });
  }
  getNamaDonatur(){
      this.nama_donatur="H.Dermawan";
  }
  getNamaPendamping(){
    this.nama_pendamping="Ustad Khalid";
  }
  async initialsantriprogram(){
    await this.asp.getlist_materi().then(
      data => {
        let result:any=data;
        for (var i = 0; i < result.length; i++) {   
                let data={
                  "progam_name":result[i].materi_nama,
                  "program_nilai": "0"  
                }     
                this.programlist.push(data);
          }
      });         
  }
  goBack(){
    this.asp.go_previous_page();
  } 
  goStatusPengiriman(){
    this.asp.go_page_pengiriman_status(); 
  }
}

