import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPendampingPage } from './dashboard-pendamping.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPendampingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPendampingPageRoutingModule {}
