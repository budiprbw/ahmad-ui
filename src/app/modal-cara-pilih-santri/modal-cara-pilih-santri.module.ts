import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCaraPilihSantriPageRoutingModule } from './modal-cara-pilih-santri-routing.module';

import { ModalCaraPilihSantriPage } from './modal-cara-pilih-santri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCaraPilihSantriPageRoutingModule
  ],
  declarations: [ModalCaraPilihSantriPage]
})
export class ModalCaraPilihSantriPageModule {}
