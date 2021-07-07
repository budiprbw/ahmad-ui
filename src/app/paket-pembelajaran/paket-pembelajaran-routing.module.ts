import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaketPembelajaranPage } from './paket-pembelajaran.page';

const routes: Routes = [
  {
    path: '',
    component: PaketPembelajaranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaketPembelajaranPageRoutingModule {}
