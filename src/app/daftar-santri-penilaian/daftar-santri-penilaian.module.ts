import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaftarSantriPenilaianPageRoutingModule } from './daftar-santri-penilaian-routing.module';

import { DaftarSantriPenilaianPage } from './daftar-santri-penilaian.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaftarSantriPenilaianPageRoutingModule
  ],
  declarations: [DaftarSantriPenilaianPage]
})
export class DaftarSantriPenilaianPageModule {}
