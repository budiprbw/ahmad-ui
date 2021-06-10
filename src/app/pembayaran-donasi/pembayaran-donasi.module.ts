import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PembayaranDonasiPageRoutingModule } from './pembayaran-donasi-routing.module';

import { PembayaranDonasiPage } from './pembayaran-donasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PembayaranDonasiPageRoutingModule
  ],
  declarations: [PembayaranDonasiPage]
})
export class PembayaranDonasiPageModule {}
