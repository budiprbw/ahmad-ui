import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabmonitoringpendampingPageRoutingModule } from './tabmonitoringpendamping-routing.module';

import { TabmonitoringpendampingPage } from './tabmonitoringpendamping.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabmonitoringpendampingPageRoutingModule
  ],
  declarations: [TabmonitoringpendampingPage]
})
export class TabmonitoringpendampingPageModule {}
