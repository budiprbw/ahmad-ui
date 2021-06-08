import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SantriRegInfoPageRoutingModule } from './santri-reg-info-routing.module';

import { SantriRegInfoPage } from './santri-reg-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SantriRegInfoPageRoutingModule
  ],
  declarations: [SantriRegInfoPage]
})
export class SantriRegInfoPageModule {}
