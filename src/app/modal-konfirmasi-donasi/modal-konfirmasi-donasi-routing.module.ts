import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalKonfirmasiDonasiPage } from './modal-konfirmasi-donasi.page';

const routes: Routes = [
  {
    path: '',
    component: ModalKonfirmasiDonasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalKonfirmasiDonasiPageRoutingModule {}
