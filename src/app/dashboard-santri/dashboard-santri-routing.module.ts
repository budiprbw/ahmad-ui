import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardSantriPage } from './dashboard-santri.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardSantriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardSantriPageRoutingModule {}
