import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-santri-akun',
  templateUrl: './santri-akun.page.html',
  styleUrls: ['./santri-akun.page.scss'],
})
export class SantriAkunPage implements OnInit {
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
    this.route.navigateByUrl('/santri-profile', { replaceUrl:true });
  }
  goUbahPassword(){

  }

}
