import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaketPembelajaranPageRoutingModule } from './paket-pembelajaran-routing.module';

import { PaketPembelajaranPage } from './paket-pembelajaran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaketPembelajaranPageRoutingModule
  ],
  declarations: [PaketPembelajaranPage]
})
export class PaketPembelajaranPageModule {}
