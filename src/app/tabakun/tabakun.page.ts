import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-tabakun',
  templateUrl: './tabakun.page.html',
  styleUrls: ['./tabakun.page.scss'],
})
export class TabakunPage implements OnInit {
  public user_photoURL:any;
  constructor(
    private router: ActivatedRoute,
    private route : Router,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.user_photoURL="assets/images/no-image.png";  
  }

  goAjak(){

  }
  goProfile(){
    this.route.navigateByUrl('/donatur-profile', { replaceUrl:true });
  }
  goUbahPassword(){
    
  }
  goInfoMasuk(){

  }

}
