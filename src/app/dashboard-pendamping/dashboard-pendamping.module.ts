import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPendampingPageRoutingModule } from './dashboard-pendamping-routing.module';

import { DashboardPendampingPage } from './dashboard-pendamping.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPendampingPageRoutingModule
  ],
  declarations: [DashboardPendampingPage]
})
export class DashboardPendampingPageModule {}
