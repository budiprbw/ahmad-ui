import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donasi-tanya-akun',
  templateUrl: './donasi-tanya-akun.page.html',
  styleUrls: ['./donasi-tanya-akun.page.scss'],
})
export class DonasiTanyaAkunPage implements OnInit {
public login_mode:string="";

  constructor(
    public route : Router,
    public router:ActivatedRoute,
    public asp:AhmadproviderService
  ) { }

  ngOnInit() {
    this.router.queryParams.subscribe((params: any) => {
      if (params['login_mode']){
        this.login_mode=params['login_mode'];
      }       
    });
  }
  goRegistrasi(){  
    this.route.navigateByUrl('/registrasi?login_mode='+ this.login_mode, { replaceUrl: true });
  }
  goLogin(){
    this.route.navigateByUrl('/login?login_mode='+ this.login_mode, { replaceUrl: true });
  }
 

}
