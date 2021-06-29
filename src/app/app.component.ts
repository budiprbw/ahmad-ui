import { Component,OnInit } from '@angular/core';
import {  Platform,NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit  {
  public devWidth = this.platform.width();
  constructor(
    private platform: Platform, private router: Router, public navCtrl: NavController,private ga: GoogleAnalytics,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {}
  ngOnInit(): void{
    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.ga.startTrackerWithId('UA-XXXXXXXXXX-X')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('Outbox') 
        .then(() => {

        })
        .catch(
          error => console.log(error)
        );  
       }).catch(
        error => console.log('Google Analytics Error: ' + error)
      );      
      console.log('Google Analytics Error: ' + this.platform.platforms());
      /*
      if (this.platform.is('desktop')) 
        {
          this.router.navigateByUrl('/webdashboard');                        
        }
        else
        {
          if (this.platform.is('android')|| this.platform.is('mobileweb')|| this.platform.is('mobile')) {
            this.router.navigateByUrl('/mobiledashboard', { replaceUrl:true });
          }
        }
        */
    })
    
  }

  trackEvent(val) {
    // Label and Value are optional, Value is numeric
    this.ga.trackEvent('Category', 'Action', 'Label', val)
  }  
}
