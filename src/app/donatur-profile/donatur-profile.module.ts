import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonaturProfilePageRoutingModule } from './donatur-profile-routing.module';

import { DonaturProfilePage } from './donatur-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonaturProfilePageRoutingModule
  ],
  declarations: [DonaturProfilePage]
})
export class DonaturProfilePageModule {}
