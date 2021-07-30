import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabhomependampingPageRoutingModule } from './tabhomependamping-routing.module';

import { TabhomependampingPage } from './tabhomependamping.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabhomependampingPageRoutingModule
  ],
  declarations: [TabhomependampingPage]
})
export class TabhomependampingPageModule {}
