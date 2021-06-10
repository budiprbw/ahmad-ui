import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PenyaluranDonasiPageRoutingModule } from './penyaluran-donasi-routing.module';

import { PenyaluranDonasiPage } from './penyaluran-donasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PenyaluranDonasiPageRoutingModule
  ],
  declarations: [PenyaluranDonasiPage]
})
export class PenyaluranDonasiPageModule {}
