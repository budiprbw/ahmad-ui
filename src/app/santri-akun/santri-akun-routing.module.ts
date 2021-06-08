import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SantriAkunPage } from './santri-akun.page';

const routes: Routes = [
  {
    path: '',
    component: SantriAkunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SantriAkunPageRoutingModule {}
