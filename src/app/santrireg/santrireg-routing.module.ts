import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SantriregPage } from './santrireg.page';

const routes: Routes = [
  {
    path: '',
    component: SantriregPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SantriregPageRoutingModule {}
