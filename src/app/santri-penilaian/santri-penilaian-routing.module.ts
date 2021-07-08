import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SantriPenilaianPage } from './santri-penilaian.page';

const routes: Routes = [
  {
    path: '',
    component: SantriPenilaianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SantriPenilaianPageRoutingModule {}
