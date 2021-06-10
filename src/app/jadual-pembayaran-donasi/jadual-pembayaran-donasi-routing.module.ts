import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JadualPembayaranDonasiPage } from './jadual-pembayaran-donasi.page';

const routes: Routes = [
  {
    path: '',
    component: JadualPembayaranDonasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JadualPembayaranDonasiPageRoutingModule {}
