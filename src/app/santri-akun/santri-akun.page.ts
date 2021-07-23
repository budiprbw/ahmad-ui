import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-santri-akun',
  templateUrl: './santri-akun.page.html',
  styleUrls: ['./santri-akun.page.scss'],
})
export class SantriAkunPage implements OnInit {
  public user_photoURL:any;
  constructor(
    public asp: AhmadproviderService
  ) { }
  
  ngOnInit() {
    this.user_photoURL="assets/images/no-image.png";
  }
  goAjak(){

  }
  goProfile(){
    this.asp.go_page_santri_profile();
  }
  goUbahPassword(){

  }
  goKeluar(){
    this.asp.go_page_home();

  }

}
