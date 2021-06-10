import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabakunPage } from './tabakun.page';

const routes: Routes = [
  {
    path: '',
    component: TabakunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabakunPageRoutingModule {}
