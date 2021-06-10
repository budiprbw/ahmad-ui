import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonasiListPage } from './donasi-list.page';

const routes: Routes = [
  {
    path: '',
    component: DonasiListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonasiListPageRoutingModule {}
