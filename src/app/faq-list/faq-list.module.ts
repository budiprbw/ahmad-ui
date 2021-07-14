import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaqListPageRoutingModule } from './faq-list-routing.module';

import { FaqListPage } from './faq-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaqListPageRoutingModule
  ],
  declarations: [FaqListPage]
})
export class FaqListPageModule {}
