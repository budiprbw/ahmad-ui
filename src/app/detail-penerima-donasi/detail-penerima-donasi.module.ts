import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPenerimaDonasiPageRoutingModule } from './detail-penerima-donasi-routing.module';

import { DetailPenerimaDonasiPage } from './detail-penerima-donasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPenerimaDonasiPageRoutingModule
  ],
  declarations: [DetailPenerimaDonasiPage]
})
export class DetailPenerimaDonasiPageModule {}
