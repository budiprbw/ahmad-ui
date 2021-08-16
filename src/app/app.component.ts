import { Component,OnInit } from '@angular/core';
import {  Platform,NavController,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { AhmadproviderService } from './ahmadprovider.service';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit  {
  constructor(
    private platform: Platform, private router: Router, public navCtrl: NavController,private ga: GoogleAnalytics,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private push: Push,
    public alertCtrl: AlertController,
    private deeplinks:Deeplinks,
    private zone: NgZone,
    public asp:AhmadproviderService
  ) {}
  ngAfterViewInit(){    
    this.handleHardwareBackbutton();
  }
  ngOnInit(): void{
    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('android')){
        this.pushSetup();
      }
      else{
        this.asp.setPushNotifToken('-1');
      }
      this.initializeApp();

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
    this.ga.trackEvent('Category', 'Action', 'Label', val);

  }  
  pushSetup(){
    /*
    json send postman:
    post: https://fcm.googleapis.com/fcm/send
    header :{
      Content-Type : application/json,
      Authorization: "key=AAAAJ3gcsA0:APA91bFTogmY-_Te2iGiWaL74kCivad-guaRfKPnnKkooSYQk-vTQgeD2eoVlseqMWQQVjxOzFFFhj2ZpATCbQdaqfQ9zhhvMT13IrQSNIcwNQrpiWWHdB4WixXn-JvqEIoNI_mt5o_O"
    }
    body:
    {
        "notification":{
            "title": "ahmad project baru okay bos",
            "body": " notification body",
            "sound": "default",
            "Click_action" :"FCM_PLUGIN_ACTIVIT",
            "badge": "2"
        },
        "data":{
          "landing_page":"gabung",
          "referal_id":"10000001",
          "title" : "ahmad project bos foreground",
          "body": " notification body",
          "content_available" : "true",
          "notification_foreground": "true"
        },
        "to" :"cbbf9yoQ7r0:APA91bGrfpnFYEsgZgGOX_J3RVyeH8NiEDE4QRFrEACExD8R3DiKuT2heZdUeKen1eJWxTSQ4bM6ulsnGEAcUdr0IKuIeOV6UYjMlhrObTwjJ_ST0pZMMDsDoDJmvn81scibHXj8uAYC",
        "priority":"high",
        "restricted_package_name": "",
        "type":2,
        "foreground": "true"
      }
    */

    const options: PushOptions = {
      android: {
        senderID:"169518870541"
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      }
    }
    const pushObject: PushObject = this.push.init(options);
    
    pushObject.on('registration').subscribe((registration: any) => {
      let token:any  = registration.registrationId;
      console.log('Device registered', token);
      this.asp.setPushNotifToken(token);
    });

    pushObject.on('notification').subscribe((notification: any) =>  {   
        console.log('Received a notification', notification);
        let data:any = notification.additionalData;
        let landing_page=data.landing_page;
        let referal_id=data.referal_id;            
        if (notification.additionalData.foreground) {
          this.alertCtrl.create({
            header: 'New Notification',
            subHeader: 'AHmad Project',
            message: notification.message,
            buttons: [
              {
                text: 'Open',
                handler: () => {
                  console.log('Open page');
                  //this.router.navigate([landing_page, referal_id]);
                }
              },
              {
                text: 'Back to home',
                handler: () => {
                  //this.router.navigateByUrl('/webdashboard');   
                  console.log('Back to home');
                }
              }
            ]
          }).then(res => {            
            res.present();
          });
        }
        else
        {
          //this.router.navigate([landing_page, referal_id]);
          console.log('Received a notification', notification);
        }          
    });
    
    pushObject.on('error').subscribe(error => 
      console.error('Error with Push plugin', error)
    );    

  };
  async checkAppInstalled(){
    const fun = navigator['getInstalledRelatedApps'];
     let listOfInstalledApps = await fun.call(navigator);
     console.log(listOfInstalledApps);
  }
  initializeApp() {
    this.deeplinks.routeWithNavController(this.navCtrl, {
      '/login': 'login',
      '/': 'webdashboard'
    }).subscribe((match) => {
      //console.log('Successfully matched route', match);
      let result: any = match;
      const internalPath = match.$link.path + '?' + match.$link.queryString;
      //console.log(internalPath);
      this.zone.run(() => {
        this.router.navigateByUrl(internalPath);
      });
    }, (nomatch) => {
      console.error('Got a deeplink that didn\'t match', nomatch);
    });
  }
  handleHardwareBackbutton() {
    this.platform.backButton.subscribeWithPriority(5, () => {
      this.alertCtrl.create({
        header: 'Application Termination',
        subHeader: 'AHmad Project',
        message: "Do you want to close the application ?",
        buttons: [
          {
            text: 'EXIT',
            handler: () => {
              navigator['app'].exitApp();
            }
          },
          {
            text: 'STAY',
            handler: () => {
              console.log('STAY');
            }
          }
        ]
      }).then(res => {            
        res.present();
      });;
    })
  }


}
