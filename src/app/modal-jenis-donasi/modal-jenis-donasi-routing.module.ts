import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalJenisDonasiPage } from './modal-jenis-donasi.page';

const routes: Routes = [
  {
    path: '',
    component: ModalJenisDonasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalJenisDonasiPageRoutingModule {}
