import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabprogramsantriPageRoutingModule } from './tabprogramsantri-routing.module';

import { TabprogramsantriPage } from './tabprogramsantri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabprogramsantriPageRoutingModule
  ],
  declarations: [TabprogramsantriPage]
})
export class TabprogramsantriPageModule {}
