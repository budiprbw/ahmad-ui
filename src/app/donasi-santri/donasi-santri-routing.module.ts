import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonasiSantriPage } from './donasi-santri.page';

const routes: Routes = [
  {
    path: '',
    component: DonasiSantriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonasiSantriPageRoutingModule {}
