import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SantriKuesionerPageRoutingModule } from './santri-kuesioner-routing.module';

import { SantriKuesionerPage } from './santri-kuesioner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SantriKuesionerPageRoutingModule
  ],
  declarations: [SantriKuesionerPage]
})
export class SantriKuesionerPageModule {}
