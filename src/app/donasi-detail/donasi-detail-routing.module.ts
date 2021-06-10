import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonasiDetailPage } from './donasi-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DonasiDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonasiDetailPageRoutingModule {}
