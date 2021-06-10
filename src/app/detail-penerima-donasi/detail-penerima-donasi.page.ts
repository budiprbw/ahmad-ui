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
private santri_id:any="";
private nama_santri:any="";
private bulan_pendampingan:any="";
private progress_belajar:any="";
public programlist:any=[];

  constructor(
    private route: Router,
    private router:ActivatedRoute
  ) { }

  ngOnInit() {
    this.santri_id= this.router.snapshot.paramMap.get("santri_id");
    this.nama_santri= this.router.snapshot.paramMap.get("nama_santri");
    this.bulan_pendampingan="0.70";
    this.progress_belajar="0.92";
    this.initialsantriprogram();
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
