import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalUbahBankPage } from './modal-ubah-bank.page';

const routes: Routes = [
  {
    path: '',
    component: ModalUbahBankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalUbahBankPageRoutingModule {}
