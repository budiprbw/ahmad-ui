import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PengingatBimbinganPageRoutingModule } from './pengingat-bimbingan-routing.module';

import { PengingatBimbinganPage } from './pengingat-bimbingan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PengingatBimbinganPageRoutingModule
  ],
  declarations: [PengingatBimbinganPage]
})
export class PengingatBimbinganPageModule {}
