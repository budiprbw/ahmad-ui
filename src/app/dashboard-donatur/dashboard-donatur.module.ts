import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardDonaturPageRoutingModule } from './dashboard-donatur-routing.module';

import { DashboardDonaturPage } from './dashboard-donatur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardDonaturPageRoutingModule
  ],
  declarations: [DashboardDonaturPage]
})
export class DashboardDonaturPageModule {}
