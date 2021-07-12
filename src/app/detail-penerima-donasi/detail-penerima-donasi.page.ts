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
        this.progress_belajar=this.santri.pencapaian;
      }
    });
    
    this.bulan_pendampingan="0.70";
    //this.progress_belajar="0.92";
    this.getMateri();

  }
  async getMateri(){
    await this.asp.getlist_materi().then(
      data => {
        this.programlist = data;
      });
  }
  initialsantriprogram(){
    let row1 ={
      "progam_name": "Bab 1",
      "program_nilai": "1"  ,    
    };
    this.programlist.push(row1);
    let row2 ={
      "progam_name": "Bab 2",
      "program_nilai": "0.90",    
    };
    this.programlist.push(row2);
    let row3 ={
      "progam_name": "Bab 3",
      "program_nilai": "0.5",       
    };
    this.programlist.push(row3);
  }
  goBack(){
    this.route.navigateByUrl('/donasi-santri-list', { replaceUrl:true });
  } 


}
