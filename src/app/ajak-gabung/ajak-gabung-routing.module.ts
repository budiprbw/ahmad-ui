import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjakGabungPage } from './ajak-gabung.page';

const routes: Routes = [
  {
    path: '',
    component: AjakGabungPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjakGabungPageRoutingModule {}
