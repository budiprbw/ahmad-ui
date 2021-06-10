import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonasiSantriListPageRoutingModule } from './donasi-santri-list-routing.module';

import { DonasiSantriListPage } from './donasi-santri-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonasiSantriListPageRoutingModule
  ],
  declarations: [DonasiSantriListPage]
})
export class DonasiSantriListPageModule {}
