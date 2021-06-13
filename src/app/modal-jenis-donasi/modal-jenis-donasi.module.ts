import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalJenisDonasiPageRoutingModule } from './modal-jenis-donasi-routing.module';

import { ModalJenisDonasiPage } from './modal-jenis-donasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalJenisDonasiPageRoutingModule
  ],
  declarations: [ModalJenisDonasiPage]
})
export class ModalJenisDonasiPageModule {}
