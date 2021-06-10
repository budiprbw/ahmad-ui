import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JadualPembayaranDonasiPageRoutingModule } from './jadual-pembayaran-donasi-routing.module';

import { JadualPembayaranDonasiPage } from './jadual-pembayaran-donasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JadualPembayaranDonasiPageRoutingModule
  ],
  declarations: [JadualPembayaranDonasiPage]
})
export class JadualPembayaranDonasiPageModule {}
