import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-santri-akun',
  templateUrl: './santri-akun.page.html',
  styleUrls: ['./santri-akun.page.scss'],
})
export class SantriAkunPage implements OnInit {
  public user_photoURL:any;
  constructor() { }

  ngOnInit() {
    this.user_photoURL="../assets/images/no-image.png";
  }

}
