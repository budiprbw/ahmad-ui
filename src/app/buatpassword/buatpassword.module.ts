import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuatpasswordPageRoutingModule } from './buatpassword-routing.module';

import { BuatpasswordPage } from './buatpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuatpasswordPageRoutingModule
  ],
  declarations: [BuatpasswordPage]
})
export class BuatpasswordPageModule {}
