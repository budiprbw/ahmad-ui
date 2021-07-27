import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabakunsantriPageRoutingModule } from './tabakunsantri-routing.module';

import { TabakunsantriPage } from './tabakunsantri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabakunsantriPageRoutingModule
  ],
  declarations: [TabakunsantriPage]
})
export class TabakunsantriPageModule {}
