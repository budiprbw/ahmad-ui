import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabakunpendampingPage } from './tabakunpendamping.page';

const routes: Routes = [
  {
    path: '',
    component: TabakunpendampingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabakunpendampingPageRoutingModule {}
