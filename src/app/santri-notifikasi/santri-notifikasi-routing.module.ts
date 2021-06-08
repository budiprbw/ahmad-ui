import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SantriNotifikasiPage } from './santri-notifikasi.page';

const routes: Routes = [
  {
    path: '',
    component: SantriNotifikasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SantriNotifikasiPageRoutingModule {}
