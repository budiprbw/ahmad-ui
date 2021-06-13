import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalNominalDonasiPageRoutingModule } from './modal-nominal-donasi-routing.module';

import { ModalNominalDonasiPage } from './modal-nominal-donasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalNominalDonasiPageRoutingModule
  ],
  declarations: [ModalNominalDonasiPage]
})
export class ModalNominalDonasiPageModule {}
