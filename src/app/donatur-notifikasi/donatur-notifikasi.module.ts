import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonaturNotifikasiPageRoutingModule } from './donatur-notifikasi-routing.module';

import { DonaturNotifikasiPage } from './donatur-notifikasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonaturNotifikasiPageRoutingModule
  ],
  declarations: [DonaturNotifikasiPage]
})
export class DonaturNotifikasiPageModule {}
