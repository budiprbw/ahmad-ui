import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPenerimaDonasiPage } from './detail-penerima-donasi.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPenerimaDonasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPenerimaDonasiPageRoutingModule {}
