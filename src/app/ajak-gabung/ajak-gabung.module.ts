import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjakGabungPageRoutingModule } from './ajak-gabung-routing.module';

import { AjakGabungPage } from './ajak-gabung.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjakGabungPageRoutingModule
  ],
  declarations: [AjakGabungPage]
})
export class AjakGabungPageModule {}
