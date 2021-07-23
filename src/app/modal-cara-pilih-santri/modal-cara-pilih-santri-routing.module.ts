import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCaraPilihSantriPage } from './modal-cara-pilih-santri.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCaraPilihSantriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCaraPilihSantriPageRoutingModule {}
