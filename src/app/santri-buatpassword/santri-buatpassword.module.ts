import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SantriBuatpasswordPageRoutingModule } from './santri-buatpassword-routing.module';

import { SantriBuatpasswordPage } from './santri-buatpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SantriBuatpasswordPageRoutingModule
  ],
  declarations: [SantriBuatpasswordPage]
})
export class SantriBuatpasswordPageModule {}
