import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SantriProgramPage } from './santri-program.page';

const routes: Routes = [
  {
    path: '',
    component: SantriProgramPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SantriProgramPageRoutingModule {}
