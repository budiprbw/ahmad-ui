import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonasiListPageRoutingModule } from './donasi-list-routing.module';

import { DonasiListPage } from './donasi-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonasiListPageRoutingModule
  ],
  declarations: [DonasiListPage]
})
export class DonasiListPageModule {}
