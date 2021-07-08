import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-tabprogram',
  templateUrl: './tabprogram.page.html',
  styleUrls: ['./tabprogram.page.scss'],
})
export class TabprogramPage implements OnInit {
  public line_data_lembaga:any=[];

  constructor(
    private router: ActivatedRoute,
    private route : Router,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.getDataLembaga();
  }

  async getDataLembaga(){
    await this.asp.get_lembaga().then(
      data=> {        
            this.line_data_lembaga=data;            
      });
  }
  goRiwayat(){
    this.route.navigateByUrl('/donasi-riwayat');
  }
  goListPenerimaDonasi(){
    this.route.navigateByUrl('/donasi-santri');
  }
  goStatusPengiriman(){
    this.route.navigateByUrl('/pengiriman-status-donasi');
  }
  goSalurkanDonasi(){
    this.route.navigateByUrl('/penyaluran-donasi');
  }
  html_entity(val){
    return this.asp.html_entity(val);
  }
 
}
