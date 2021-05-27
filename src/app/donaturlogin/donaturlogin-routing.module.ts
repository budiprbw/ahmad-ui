import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonaturloginPage } from './donaturlogin.page';

const routes: Routes = [
  {
    path: '',
    component: DonaturloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonaturloginPageRoutingModule {}
