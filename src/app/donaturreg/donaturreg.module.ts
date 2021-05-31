import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonaturregPageRoutingModule } from './donaturreg-routing.module';

import { DonaturregPage } from './donaturreg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonaturregPageRoutingModule
  ],
  declarations: [DonaturregPage]
})
export class DonaturregPageModule {}
