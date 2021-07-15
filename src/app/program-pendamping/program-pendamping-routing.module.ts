import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramPendampingPage } from './program-pendamping.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramPendampingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramPendampingPageRoutingModule {}
