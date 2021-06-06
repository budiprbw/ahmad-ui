import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardDonaturPage } from './dashboard-donatur.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardDonaturPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardDonaturPageRoutingModule {}
