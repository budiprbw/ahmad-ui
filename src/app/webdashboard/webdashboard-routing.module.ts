import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebdashboardPage } from './webdashboard.page';

const routes: Routes = [
  {
    path: '',
    component: WebdashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebdashboardPageRoutingModule {}
