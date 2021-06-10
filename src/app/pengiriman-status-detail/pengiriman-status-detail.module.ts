import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PengirimanStatusDetailPageRoutingModule } from './pengiriman-status-detail-routing.module';

import { PengirimanStatusDetailPage } from './pengiriman-status-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PengirimanStatusDetailPageRoutingModule
  ],
  declarations: [PengirimanStatusDetailPage]
})
export class PengirimanStatusDetailPageModule {}
