import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PengingatDonasiPageRoutingModule } from './pengingat-donasi-routing.module';

import { PengingatDonasiPage } from './pengingat-donasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PengingatDonasiPageRoutingModule
  ],
  declarations: [PengingatDonasiPage]
})
export class PengingatDonasiPageModule {}
