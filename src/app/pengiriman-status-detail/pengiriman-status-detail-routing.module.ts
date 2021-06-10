import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengirimanStatusDetailPage } from './pengiriman-status-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PengirimanStatusDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengirimanStatusDetailPageRoutingModule {}
