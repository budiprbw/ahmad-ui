import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { environment } from 'src/environments/environment';
import { AhmadproviderService } from './ahmadprovider.service';
import { HttpClientModule } from '@angular/common/http';
import {  RouterModule } from '@angular/router';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { FileTransfer,  FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Storage } from '@ionic/storage';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Push } from '@ionic-native/push/ngx';
import { SocialShareComponent } from './components/social-share/social-share.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@NgModule({
  declarations: [AppComponent,SocialShareComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,HttpClientModule,RouterModule],    
    
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AhmadproviderService,   
    GoogleAnalytics,
    FileTransfer,
    FileTransferObject,
    Storage,
    Push,
    SocialSharing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
