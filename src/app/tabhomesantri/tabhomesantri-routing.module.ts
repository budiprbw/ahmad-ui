import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabhomesantriPage } from './tabhomesantri.page';

const routes: Routes = [
  {
    path: '',
    component: TabhomesantriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabhomesantriPageRoutingModule {}
