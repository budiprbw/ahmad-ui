import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonasiTanyaAkunPage } from './donasi-tanya-akun.page';

const routes: Routes = [
  {
    path: '',
    component: DonasiTanyaAkunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonasiTanyaAkunPageRoutingModule {}
