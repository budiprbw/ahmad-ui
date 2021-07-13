import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramSantriPage } from './program-santri.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramSantriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramSantriPageRoutingModule {}
