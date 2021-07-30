import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabrewardpendampingPageRoutingModule } from './tabrewardpendamping-routing.module';

import { TabrewardpendampingPage } from './tabrewardpendamping.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabrewardpendampingPageRoutingModule
  ],
  declarations: [TabrewardpendampingPage]
})
export class TabrewardpendampingPageModule {}
