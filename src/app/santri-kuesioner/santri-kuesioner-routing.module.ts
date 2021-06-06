import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SantriKuesionerPage } from './santri-kuesioner.page';

const routes: Routes = [
  {
    path: '',
    component: SantriKuesionerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SantriKuesionerPageRoutingModule {}
