import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonaturNotifikasiPage } from './donatur-notifikasi.page';

const routes: Routes = [
  {
    path: '',
    component: DonaturNotifikasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonaturNotifikasiPageRoutingModule {}
