import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-selesai-donasi',
  templateUrl: './selesai-donasi.page.html',
  styleUrls: ['./selesai-donasi.page.scss'],
})
export class SelesaiDonasiPage implements OnInit {

  constructor(
    public asp: AhmadproviderService,
    public route : Router
  ) { }

  ngOnInit() {
    localStorage.removeItem("item_donasi");        
  }
  goBack(){
    this.route.navigateByUrl('/penyaluran-donasi', { replaceUrl:true });
  }
  goLanjutkan(){
    this.route.navigateByUrl('/pengingat-donasi', { replaceUrl:true });
  }
}
