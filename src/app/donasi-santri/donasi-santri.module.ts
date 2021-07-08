import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonasiSantriPageRoutingModule } from './donasi-santri-routing.module';

import { DonasiSantriPage } from './donasi-santri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonasiSantriPageRoutingModule
  ],
  declarations: [DonasiSantriPage]
})
export class DonasiSantriPageModule {}
