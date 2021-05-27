import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SantriloginPage } from './santrilogin.page';

const routes: Routes = [
  {
    path: '',
    component: SantriloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SantriloginPageRoutingModule {}
