import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDoaPageRoutingModule } from './view-doa-routing.module';

import { ViewDoaPage } from './view-doa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDoaPageRoutingModule
  ],
  declarations: [ViewDoaPage]
})
export class ViewDoaPageModule {}
