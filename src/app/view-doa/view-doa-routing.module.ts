import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDoaPage } from './view-doa.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDoaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDoaPageRoutingModule {}
