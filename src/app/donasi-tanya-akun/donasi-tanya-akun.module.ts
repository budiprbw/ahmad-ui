import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonasiTanyaAkunPageRoutingModule } from './donasi-tanya-akun-routing.module';

import { DonasiTanyaAkunPage } from './donasi-tanya-akun.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonasiTanyaAkunPageRoutingModule
  ],
  declarations: [DonasiTanyaAkunPage]
})
export class DonasiTanyaAkunPageModule {}
