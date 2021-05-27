import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IsiprofilePageRoutingModule } from './isiprofile-routing.module';

import { IsiprofilePage } from './isiprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IsiprofilePageRoutingModule
  ],
  declarations: [IsiprofilePage]
})
export class IsiprofilePageModule {}
