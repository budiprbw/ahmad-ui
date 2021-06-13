import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelesaiDonasiPage } from './selesai-donasi.page';

const routes: Routes = [
  {
    path: '',
    component: SelesaiDonasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelesaiDonasiPageRoutingModule {}
