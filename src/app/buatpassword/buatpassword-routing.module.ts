import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuatpasswordPage } from './buatpassword.page';

const routes: Routes = [
  {
    path: '',
    component: BuatpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuatpasswordPageRoutingModule {}
