import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonasiProgramPage } from './donasi-program.page';

const routes: Routes = [
  {
    path: '',
    component: DonasiProgramPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonasiProgramPageRoutingModule {}
