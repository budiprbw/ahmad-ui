import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-santri-buatpassword',
  templateUrl: './santri-buatpassword.page.html',
  styleUrls: ['./santri-buatpassword.page.scss'],
})
export class SantriBuatpasswordPage implements OnInit {
  public usrinfo: any;
  public isActiveToggleTextPassword_1:boolean=true;
  public isActiveToggleTextPassword_2:boolean=true;
  public newpassword:string;
  public confirmassword:string;
  constructor(private route: Router, public asp: AhmadproviderService) { }

  ngOnInit() {
    this.usrinfo = this.asp.getUserInfo();    

  }
  public toggleTextPassword_1(): void {
    this.isActiveToggleTextPassword_1 = (this.isActiveToggleTextPassword_1 == true) ? false : true;
  }
  public toggleTextPassword_2(): void {
    this.isActiveToggleTextPassword_2 = (this.isActiveToggleTextPassword_2 == true) ? false : true;
  }
  public getType_1() {
    return this.isActiveToggleTextPassword_1 ? 'password' : 'text';
  }
  public getType_2() {
    return this.isActiveToggleTextPassword_2 ? 'password' : 'text';
  }
  goBuatpassword(){
    
    this.route.navigate(['santri-kuesioner']);
  }
  goBack(){

  }
}
