import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalUbahBankPageRoutingModule } from './modal-ubah-bank-routing.module';

import { ModalUbahBankPage } from './modal-ubah-bank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalUbahBankPageRoutingModule
  ],
  declarations: [ModalUbahBankPage]
})
export class ModalUbahBankPageModule {}
