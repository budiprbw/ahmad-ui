import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SantriProfilePageRoutingModule } from './santri-profile-routing.module';

import { SantriProfilePage } from './santri-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SantriProfilePageRoutingModule
  ],
  declarations: [SantriProfilePage]
})
export class SantriProfilePageModule {}
