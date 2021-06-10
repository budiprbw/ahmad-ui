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
 private bulan_pendampingan:any="";
private progress_belajar:any="";

  constructor(
    public asp: AhmadproviderService,
    public route : Router
  ) { }

  ngOnInit() {
    this.getNamaDonatur();
    this.getNamaPendamping();
    this.initialsantriprogram();
    this.bulan_pendampingan="0.70";
    this.progress_belajar="0.92";
  }
  getNamaDonatur(){
      this.nama_donatur="H.Dermawan";
  }
  getNamaPendamping(){
    this.nama_pendamping="Ustad Khalid";
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
    this.asp.go_previous_page();
  } 
  goStatusPengiriman(){
    this.route.navigateByUrl('/pengiriman-status', { replaceUrl: true });    
  }
}

