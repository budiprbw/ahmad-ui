import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabprogramPageRoutingModule } from './tabprogram-routing.module';

import { TabprogramPage } from './tabprogram.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabprogramPageRoutingModule
  ],
  declarations: [TabprogramPage]
})
export class TabprogramPageModule {}
