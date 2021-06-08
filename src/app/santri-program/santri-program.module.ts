import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SantriProgramPageRoutingModule } from './santri-program-routing.module';

import { SantriProgramPage } from './santri-program.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SantriProgramPageRoutingModule
  ],
  declarations: [SantriProgramPage]
})
export class SantriProgramPageModule {}
