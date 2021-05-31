import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobiledashboardPage } from './mobiledashboard.page';

const routes: Routes = [
  {
    path: '',
    component: MobiledashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobiledashboardPageRoutingModule {}
