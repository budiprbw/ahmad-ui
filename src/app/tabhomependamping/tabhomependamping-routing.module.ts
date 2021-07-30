import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabhomependampingPage } from './tabhomependamping.page';

const routes: Routes = [
  {
    path: '',
    component: TabhomependampingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabhomependampingPageRoutingModule {}
