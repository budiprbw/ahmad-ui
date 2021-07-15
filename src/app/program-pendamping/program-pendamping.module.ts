import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramPendampingPageRoutingModule } from './program-pendamping-routing.module';

import { ProgramPendampingPage } from './program-pendamping.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramPendampingPageRoutingModule
  ],
  declarations: [ProgramPendampingPage]
})
export class ProgramPendampingPageModule {}
