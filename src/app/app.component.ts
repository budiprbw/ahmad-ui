import { Component,OnInit } from '@angular/core';
import {  Platform,NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit  {
  constructor(
    private platform: Platform, private router: Router, public navCtrl: NavController
  ) {}
  ngOnInit(): void{
    
    this.platform.ready().then(() => {
    
          if (this.platform.is('android')) 
            {
              if (this.platform.is('android')) {
                this.router.navigateByUrl('/mobiledashboard', { replaceUrl:true });
              }
            }
            else
            {
              this.router.navigateByUrl('/webdashboard');
              console.log('web browser') ;
            }
    })
  }
}
