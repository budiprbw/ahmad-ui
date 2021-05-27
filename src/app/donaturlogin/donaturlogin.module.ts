import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonaturloginPageRoutingModule } from './donaturlogin-routing.module';

import { DonaturloginPage } from './donaturlogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonaturloginPageRoutingModule
  ],
  declarations: [DonaturloginPage]
})
export class DonaturloginPageModule {}
