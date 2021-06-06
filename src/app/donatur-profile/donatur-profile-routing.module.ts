import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonaturProfilePage } from './donatur-profile.page';

const routes: Routes = [
  {
    path: '',
    component: DonaturProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonaturProfilePageRoutingModule {}
