import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-tabhome',
  templateUrl: './tabhome.page.html',
  styleUrls: ['./tabhome.page.scss'],
})
export class TabhomePage implements OnInit {
  public belum_donasi:any=false;
  public donatur_id:any;
  public usrinfo:any;
  public berita:any;
  public line_data_lembaga:any=[];
  public hadistList:any=[];
  public pengingatList:any=[];

  constructor(
    private router: ActivatedRoute,
    private route : Router,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {    
    localStorage.setItem("login_mode","donatur");
    this.usrinfo =this.asp.getUserInfo();
    this.donatur_id=  this.usrinfo.ref_object.id;
    this.getHadistHariini();
    this.getBeritaKampanye();    
    this.getDataLembaga();
    this.getListPengingat();
  
  }
  async getBeritaKampanye(){
    this.belum_donasi=false;
    await this.asp.getlist_berita_kampanye().then(
      data=> {        
        this.berita=data;
      });   
  }
  async getHadistHariini(){
    await this.asp.hadist_by_donaturid(this.donatur_id).then(
      data=> {        
        let retval:any=data;
        this.hadistList=retval.data;
      });   
  }
  async getDataLembaga(){
    await this.asp.get_lembaga().then(
      data=> {        
            this.line_data_lembaga=data;            
      });
  }
  async getListPengingat(){
    await this.asp.getlist_pengingat().then(
      data=> {        
            this.pengingatList=data[0];            
      });
  }


  
  goLihatdetail(){
    this.route.navigateByUrl('/donasi-santri-list');
  }
  goPengingat(){
    this.route.navigateByUrl('/donasi-riwayat', { replaceUrl:true });
  }
  public goInfoMasuk(){
    this.route.navigate(['donatur-notifikasi', { donatur_id: this.donatur_id }]);
  }
  goSalurkanDonasi(){
    this.route.navigateByUrl('/penyaluran-donasi', { replaceUrl:true });
  }
  html_entity(val){
    return this.asp.html_entity(val);
  }

}
