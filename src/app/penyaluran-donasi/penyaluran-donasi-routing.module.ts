import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PenyaluranDonasiPage } from './penyaluran-donasi.page';

const routes: Routes = [
  {
    path: '',
    component: PenyaluranDonasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PenyaluranDonasiPageRoutingModule {}
