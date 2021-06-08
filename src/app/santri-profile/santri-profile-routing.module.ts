import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SantriProfilePage } from './santri-profile.page';

const routes: Routes = [
  {
    path: '',
    component: SantriProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SantriProfilePageRoutingModule {}
