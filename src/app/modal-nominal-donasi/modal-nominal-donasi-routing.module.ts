import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalNominalDonasiPage } from './modal-nominal-donasi.page';

const routes: Routes = [
  {
    path: '',
    component: ModalNominalDonasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalNominalDonasiPageRoutingModule {}
