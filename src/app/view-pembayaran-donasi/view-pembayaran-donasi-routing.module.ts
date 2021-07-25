import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPembayaranDonasiPage } from './view-pembayaran-donasi.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPembayaranDonasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPembayaranDonasiPageRoutingModule {}
