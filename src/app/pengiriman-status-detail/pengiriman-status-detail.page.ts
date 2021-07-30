import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-pengiriman-status-detail',
  templateUrl: './pengiriman-status-detail.page.html',
  styleUrls: ['./pengiriman-status-detail.page.scss'],
})
export class PengirimanStatusDetailPage implements OnInit {
  public santri_id:string="";
  public nama_santri:string="";
  public deliverydetaillist:any=[];
  constructor(
    private route: Router,
    private router:ActivatedRoute,
    public asp: AhmadproviderService,

  ) { }

  ngOnInit() {
    this.santri_id= this.router.snapshot.paramMap.get("santri_id");
    this.nama_santri= this.router.snapshot.paramMap.get("nama_santri");
    this.initialdeliverydetailStatus();
  }
  goBack() {
    this.asp.go_previous_page();
  }
 async initialdeliverydetailStatus(){
    await this.asp.santri_lacak_produk(this.santri_id).then(
      data => {
        let result:any =data
        this.deliverydetaillist = result.manifest;                        
      });   
  }

}
