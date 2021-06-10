import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengirimanStatusDonasiPage } from './pengiriman-status-donasi.page';

const routes: Routes = [
  {
    path: '',
    component: PengirimanStatusDonasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengirimanStatusDonasiPageRoutingModule {}
