import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaftarSantriPenilaianPage } from './daftar-santri-penilaian.page';

const routes: Routes = [
  {
    path: '',
    component: DaftarSantriPenilaianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaftarSantriPenilaianPageRoutingModule {}
