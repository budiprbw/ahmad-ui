import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebdashboardPageRoutingModule } from './webdashboard-routing.module';

import { WebdashboardPage } from './webdashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebdashboardPageRoutingModule
  ],
  declarations: [WebdashboardPage]
})
export class WebdashboardPageModule {}
