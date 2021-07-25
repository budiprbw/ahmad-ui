import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengingatBimbinganPage } from './pengingat-bimbingan.page';

const routes: Routes = [
  {
    path: '',
    component: PengingatBimbinganPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengingatBimbinganPageRoutingModule {}
