import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabrewardpendampingPage } from './tabrewardpendamping.page';

const routes: Routes = [
  {
    path: '',
    component: TabrewardpendampingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabrewardpendampingPageRoutingModule {}
