import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PengirimanStatusDonasiPageRoutingModule } from './pengiriman-status-donasi-routing.module';

import { PengirimanStatusDonasiPage } from './pengiriman-status-donasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PengirimanStatusDonasiPageRoutingModule
  ],
  declarations: [PengirimanStatusDonasiPage]
})
export class PengirimanStatusDonasiPageModule {}
