import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SantriloginPageRoutingModule } from './santrilogin-routing.module';

import { SantriloginPage } from './santrilogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SantriloginPageRoutingModule
  ],
  declarations: [SantriloginPage]
})
export class SantriloginPageModule {}
