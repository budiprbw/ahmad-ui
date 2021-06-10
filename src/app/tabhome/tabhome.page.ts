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
  public santri_id:any;
  constructor(
    private router: ActivatedRoute,
    private route : Router,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.initdatadonasi();    
  }
  initdatadonasi(){
    this.belum_donasi=false;
  }
  goLihatdetail(){
    this.route.navigateByUrl('/donasi-santri-list', { replaceUrl:true });
  }
  goPengingat(){
    this.route.navigateByUrl('/donasi-riwayat', { replaceUrl:true });
  }
  goInfoMasuk(){
    this.santri_id="1";
    this.route.navigate(['donatur-notifikasi', { santri_id: this.santri_id }]);
  }
}
