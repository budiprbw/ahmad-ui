import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SantriNotifikasiPageRoutingModule } from './santri-notifikasi-routing.module';

import { SantriNotifikasiPage } from './santri-notifikasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SantriNotifikasiPageRoutingModule
  ],
  declarations: [SantriNotifikasiPage]
})
export class SantriNotifikasiPageModule {}
