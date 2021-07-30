import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabmonitoringpendampingPage } from './tabmonitoringpendamping.page';

const routes: Routes = [
  {
    path: '',
    component: TabmonitoringpendampingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabmonitoringpendampingPageRoutingModule {}
