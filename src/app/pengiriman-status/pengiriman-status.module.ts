import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PengirimanStatusPageRoutingModule } from './pengiriman-status-routing.module';

import { PengirimanStatusPage } from './pengiriman-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PengirimanStatusPageRoutingModule
  ],
  declarations: [PengirimanStatusPage]
})
export class PengirimanStatusPageModule {}
