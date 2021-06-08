import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SantriAkunPageRoutingModule } from './santri-akun-routing.module';

import { SantriAkunPage } from './santri-akun.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SantriAkunPageRoutingModule
  ],
  declarations: [SantriAkunPage]
})
export class SantriAkunPageModule {}
