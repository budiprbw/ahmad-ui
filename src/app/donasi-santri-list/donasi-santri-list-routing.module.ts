import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonasiSantriListPage } from './donasi-santri-list.page';

const routes: Routes = [
  {
    path: '',
    component: DonasiSantriListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonasiSantriListPageRoutingModule {}
