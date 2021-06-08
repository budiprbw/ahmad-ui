import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SantriRegInfoPage } from './santri-reg-info.page';

const routes: Routes = [
  {
    path: '',
    component: SantriRegInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SantriRegInfoPageRoutingModule {}
