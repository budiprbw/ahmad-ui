import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-donasi-detail',
  templateUrl: './donasi-detail.page.html',
  styleUrls: ['./donasi-detail.page.scss'],
})
export class DonasiDetailPage implements OnInit {
  public riwayat_id:string="";
  public cicilanlist:any=[];
  constructor( 
    private route: ActivatedRoute,
    private router : Router,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    //this.riwayat_id= this.router.snapshot.paramMap.get("donasi_id");
    this.initialdetailriwayat();

  }
  initialdetailriwayat(){
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.cicilanlist = this.router.getCurrentNavigation().extras.state.cicilan;
        console.log(this.cicilanlist);
      }
    });
    
  }
  goBack(){
    //this.router.navigateByUrl('/donasi-riwayat', { replaceUrl:true });
    this.asp.go_previous_page();
  }  
}
