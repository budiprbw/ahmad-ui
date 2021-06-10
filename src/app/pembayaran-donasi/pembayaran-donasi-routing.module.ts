import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PembayaranDonasiPage } from './pembayaran-donasi.page';

const routes: Routes = [
  {
    path: '',
    component: PembayaranDonasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PembayaranDonasiPageRoutingModule {}
