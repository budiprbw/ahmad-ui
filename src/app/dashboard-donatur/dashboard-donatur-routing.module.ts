import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardDonaturPage } from './dashboard-donatur.page';


const routes: Routes = [
  {
    path: '',
    component: DashboardDonaturPage,
    children: [
      {
        path: 'tabhome',
        loadChildren: () => import('../tabhome/tabhome.module').then(m => m.TabhomePageModule)
      },
      {
        path: 'tabprogram',
        loadChildren: () => import('../tabprogram/tabprogram.module').then(m => m.TabprogramPageModule)
      },
      {
        path: 'tabakun',
        loadChildren: () => import('../tabakun/tabakun.module').then(m => m.TabakunPageModule)
      },
      {
        path: '',
        redirectTo: '/dashboard-donatur/tabhome',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard-donatur/tabhome',
    pathMatch: 'full'
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  //exports: [RouterModule],
})
export class DashboardDonaturPageRoutingModule {}
