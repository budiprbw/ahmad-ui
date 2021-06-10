import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonasiProgramPageRoutingModule } from './donasi-program-routing.module';

import { DonasiProgramPage } from './donasi-program.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonasiProgramPageRoutingModule
  ],
  declarations: [DonasiProgramPage]
})
export class DonasiProgramPageModule {}
