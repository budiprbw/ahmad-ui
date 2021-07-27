import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabakunsantriPage } from './tabakunsantri.page';

const routes: Routes = [
  {
    path: '',
    component: TabakunsantriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabakunsantriPageRoutingModule {}
