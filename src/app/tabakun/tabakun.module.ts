import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabakunPageRoutingModule } from './tabakun-routing.module';

import { TabakunPage } from './tabakun.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabakunPageRoutingModule
  ],
  declarations: [TabakunPage]
})
export class TabakunPageModule {}
