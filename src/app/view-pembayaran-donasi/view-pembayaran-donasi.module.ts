import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPembayaranDonasiPageRoutingModule } from './view-pembayaran-donasi-routing.module';

import { ViewPembayaranDonasiPage } from './view-pembayaran-donasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPembayaranDonasiPageRoutingModule
  ],
  declarations: [ViewPembayaranDonasiPage]
})
export class ViewPembayaranDonasiPageModule {}
