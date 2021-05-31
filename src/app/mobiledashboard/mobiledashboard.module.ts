import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobiledashboardPageRoutingModule } from './mobiledashboard-routing.module';

import { MobiledashboardPage } from './mobiledashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobiledashboardPageRoutingModule
  ],
  declarations: [MobiledashboardPage]
})
export class MobiledashboardPageModule {}
