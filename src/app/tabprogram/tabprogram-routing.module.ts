import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabprogramPage } from './tabprogram.page';

const routes: Routes = [
  {
    path: '',
    component: TabprogramPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabprogramPageRoutingModule {}
