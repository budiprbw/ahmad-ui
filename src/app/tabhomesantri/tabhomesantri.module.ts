import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabhomesantriPageRoutingModule } from './tabhomesantri-routing.module';

import { TabhomesantriPage } from './tabhomesantri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabhomesantriPageRoutingModule
  ],
  declarations: [TabhomesantriPage]
})
export class TabhomesantriPageModule {}
