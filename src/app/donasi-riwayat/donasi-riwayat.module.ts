import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonasiRiwayatPageRoutingModule } from './donasi-riwayat-routing.module';

import { DonasiRiwayatPage } from './donasi-riwayat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonasiRiwayatPageRoutingModule
  ],
  declarations: [DonasiRiwayatPage]
})
export class DonasiRiwayatPageModule {}
