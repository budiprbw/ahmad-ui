import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonaturregPage } from './donaturreg.page';

const routes: Routes = [
  {
    path: '',
    component: DonaturregPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonaturregPageRoutingModule {}
