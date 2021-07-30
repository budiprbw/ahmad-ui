import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPendampingPage } from './dashboard-pendamping.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPendampingPage,
    children: [
      {
        path: 'tabhomependamping',
        loadChildren: () => import('../tabhomependamping/tabhomependamping.module').then(m => m.TabhomependampingPageModule)
      },
      {
        path: 'tabmonitoringpendamping',
        loadChildren: () => import('../tabmonitoringpendamping/tabmonitoringpendamping.module').then(m => m.TabmonitoringpendampingPageModule)
      },
      {
        path: 'tabrewardpendamping',
        loadChildren: () => import('../tabrewardpendamping/tabrewardpendamping.module').then(m => m.TabrewardpendampingPageModule)
      },
      {
        path: 'tabakunpendamping',
        loadChildren: () => import('../tabakunpendamping/tabakunpendamping.module').then(m => m.TabakunpendampingPageModule)
      },
      {
        path: '',
        redirectTo: '/dashboard-pendamping/tabhomependamping',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard-donatur/tabhome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPendampingPageRoutingModule {}
