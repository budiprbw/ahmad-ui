import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramSantriPageRoutingModule } from './program-santri-routing.module';

import { ProgramSantriPage } from './program-santri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramSantriPageRoutingModule
  ],
  declarations: [ProgramSantriPage]
})
export class ProgramSantriPageModule {}
