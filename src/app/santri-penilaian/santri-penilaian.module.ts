import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SantriPenilaianPageRoutingModule } from './santri-penilaian-routing.module';

import { SantriPenilaianPage } from './santri-penilaian.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SantriPenilaianPageRoutingModule
  ],
  declarations: [SantriPenilaianPage]
})
export class SantriPenilaianPageModule {}
