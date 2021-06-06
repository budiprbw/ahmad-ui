import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SantriBuatpasswordPage } from './santri-buatpassword.page';

const routes: Routes = [
  {
    path: '',
    component: SantriBuatpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SantriBuatpasswordPageRoutingModule {}
