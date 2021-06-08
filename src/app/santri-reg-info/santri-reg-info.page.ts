import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-santri-reg-info',
  templateUrl: './santri-reg-info.page.html',
  styleUrls: ['./santri-reg-info.page.scss'],
})
export class SantriRegInfoPage implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }
  goDashboard(){
    this.route.navigateByUrl('/santrilogin', { replaceUrl: true });
  }

}
