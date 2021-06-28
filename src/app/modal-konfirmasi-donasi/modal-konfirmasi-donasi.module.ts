import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalKonfirmasiDonasiPageRoutingModule } from './modal-konfirmasi-donasi-routing.module';

import { ModalKonfirmasiDonasiPage } from './modal-konfirmasi-donasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalKonfirmasiDonasiPageRoutingModule
  ],
  declarations: [ModalKonfirmasiDonasiPage]
})
export class ModalKonfirmasiDonasiPageModule {}
