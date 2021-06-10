import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengingatDonasiPage } from './pengingat-donasi.page';

const routes: Routes = [
  {
    path: '',
    component: PengingatDonasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengingatDonasiPageRoutingModule {}
