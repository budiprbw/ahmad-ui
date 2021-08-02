import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-detail-penerima-donasi',
  templateUrl: './detail-penerima-donasi.page.html',
  styleUrls: ['./detail-penerima-donasi.page.scss'],
})
export class DetailPenerimaDonasiPage implements OnInit {
public noProgram:any=true;
public santri:any;
public santri_id:any="";
public nama_santri:any="";
public bulan_pendampingan:any="";
public progress_belajar:any="";
public programlist:any=[];
public nama_pendamping:any="";
public nama_donatur:string="";
public santri_sisa_bulan:string=""
public bimbingan_mulai:any;
public bimbingan_akhir:any;


  constructor(
    private route: Router,
    private router:ActivatedRoute,
    private asp:AhmadproviderService
  ) { }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      if (this.route.getCurrentNavigation().extras.state) {
        this.santri = this.route.getCurrentNavigation().extras.state.santri;
        this.santri_id= this.santri.santri_id;
        this.nama_santri= this.santri.nama_santri;
      }
    });
    
    this.getMateri();
    this.getsantriDashboard();

  }
  async getMateri(){
    await this.asp.getlist_materi().then(
      data => {
        this.programlist = data;
      });
  }
  async getsantriDashboard(){
    await this.asp.santri_dashboard(this.santri_id).then(data=>{
        let retval:any=data;
        this.progress_belajar=retval.data.santri_progress_belajar;
        this.bulan_pendampingan=retval.data.santri_progress_waktu;
        this.santri_sisa_bulan  =retval.data.santri_sisa_bulan;
        this.bimbingan_mulai  =retval.data.bimbingan_mulai;
        this.bimbingan_akhir  =retval.data.bimbingan_akhir;
        this.nama_donatur=retval.data.donatur;
        this.nama_pendamping=retval.data.pendamping;
    })
  }

  goBack(){
    //this.route.navigateByUrl('/donasi-santri-list', { replaceUrl:true });
    this.asp.go_previous_page();
  } 


}
