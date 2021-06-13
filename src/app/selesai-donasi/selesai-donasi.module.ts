import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelesaiDonasiPageRoutingModule } from './selesai-donasi-routing.module';

import { SelesaiDonasiPage } from './selesai-donasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelesaiDonasiPageRoutingModule
  ],
  declarations: [SelesaiDonasiPage]
})
export class SelesaiDonasiPageModule {}
