import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-tabprogram',
  templateUrl: './tabprogram.page.html',
  styleUrls: ['./tabprogram.page.scss'],
})
export class TabprogramPage implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private route : Router,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
  }
  goRiwayat(){
    this.route.navigateByUrl('/donasi-riwayat', { replaceUrl:true });
  }
  goListPenerimaDonasi(){
    this.route.navigateByUrl('/donasi-santri-list', { replaceUrl:true });
  }
  goStatusPengiriman(){
    this.route.navigateByUrl('/pengiriman-status-donasi', { replaceUrl:true });
  }
  goSalurkanDonasi(){
    this.route.navigateByUrl('/penyaluran-donasi', { replaceUrl:true });
  }
 
}
