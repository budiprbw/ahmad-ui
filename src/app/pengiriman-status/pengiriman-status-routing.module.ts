import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengirimanStatusPage } from './pengiriman-status.page';

const routes: Routes = [
  {
    path: '',
    component: PengirimanStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengirimanStatusPageRoutingModule {}
