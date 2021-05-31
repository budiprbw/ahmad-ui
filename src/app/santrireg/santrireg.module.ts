import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SantriregPageRoutingModule } from './santrireg-routing.module';

import { SantriregPage } from './santrireg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SantriregPageRoutingModule
  ],
  declarations: [SantriregPage]
})
export class SantriregPageModule {}
