import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabakunpendampingPageRoutingModule } from './tabakunpendamping-routing.module';

import { TabakunpendampingPage } from './tabakunpendamping.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabakunpendampingPageRoutingModule
  ],
  declarations: [TabakunpendampingPage]
})
export class TabakunpendampingPageModule {}
