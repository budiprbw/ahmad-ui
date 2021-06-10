import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonasiDetailPageRoutingModule } from './donasi-detail-routing.module';

import { DonasiDetailPage } from './donasi-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonasiDetailPageRoutingModule
  ],
  declarations: [DonasiDetailPage]
})
export class DonasiDetailPageModule {}
