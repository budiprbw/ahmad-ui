import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsiprofilePage } from './isiprofile.page';

const routes: Routes = [
  {
    path: '',
    component: IsiprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IsiprofilePageRoutingModule {}
