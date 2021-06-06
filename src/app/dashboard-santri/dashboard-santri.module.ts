import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardSantriPageRoutingModule } from './dashboard-santri-routing.module';

import { DashboardSantriPage } from './dashboard-santri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardSantriPageRoutingModule
  ],
  declarations: [DashboardSantriPage]
})
export class DashboardSantriPageModule {}
