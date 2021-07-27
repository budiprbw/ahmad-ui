import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-dashboard-santri',
  templateUrl: './dashboard-santri.page.html',
  styleUrls: ['./dashboard-santri.page.scss'],
})
export class DashboardSantriPage implements OnInit {
public noProgram:any=true;
public noBerita:any=false;
public noHadist:any=false;
 public usrinfo: any;
 public user_email: string="";
 public user_displayName:string=""
 public user_photoURL:any;
 public line_berita:any=[];
 public santri_id:string="";
 public user_id:string="";
 public hadistList:any=[];
 public hadistisi:any=[];

  constructor(

  ) { }

  ngOnInit() {
  }
  
}
    
  
