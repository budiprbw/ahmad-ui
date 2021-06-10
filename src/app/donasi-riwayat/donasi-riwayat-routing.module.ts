import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonasiRiwayatPage } from './donasi-riwayat.page';

const routes: Routes = [
  {
    path: '',
    component: DonasiRiwayatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonasiRiwayatPageRoutingModule {}
