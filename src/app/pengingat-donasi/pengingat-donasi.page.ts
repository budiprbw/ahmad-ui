import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';


@Component({
  selector: 'app-pengingat-donasi',
  templateUrl: './pengingat-donasi.page.html',
  styleUrls: ['./pengingat-donasi.page.scss'],
})
export class PengingatDonasiPage implements OnInit {
  public jenis_donasi:string="";
  public nominal_donasi:string="";
  constructor(
    public route : ActivatedRoute,
    public router: Router,
    public asp: AhmadproviderService,
  ) { }

  ngOnInit() {
    this.getItemDonasi();
  }
  getItemDonasi(){
    var item_donasi:any=JSON.parse(localStorage.getItem("item_donasi"));
    if (item_donasi)
    {
      this.jenis_donasi= item_donasi.jenis_donasi_text;
      this.nominal_donasi= this.format_number(item_donasi.donasi_tagih);
    }
  }
  goRiwayatDonasi(){    
    this.router.navigateByUrl('/donasi-riwayat');
  }
  goBack(){
    this.asp.go_previous_page();
  }
  format_number(v){
    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');    
  }

}
