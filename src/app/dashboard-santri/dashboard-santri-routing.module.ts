import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardSantriPage } from './dashboard-santri.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardSantriPage,
    children: [
      {
        path: 'tabhomesantri',
        loadChildren: () => import('../tabhomesantri/tabhomesantri.module').then( m => m.TabhomesantriPageModule)
      },      
      {
        path: 'tabprogramsantri',
        loadChildren: () => import('../tabprogramsantri/tabprogramsantri.module').then( m => m.TabprogramsantriPageModule)
      },
      {
        path: 'tabakunsantri',
        loadChildren: () => import('../tabakunsantri/tabakunsantri.module').then( m => m.TabakunsantriPageModule)
      },
      {
        path: '',
        redirectTo: '/dashboard-santri/tabhomesantri',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
 // exports: [RouterModule],
})
export class DashboardSantriPageRoutingModule {}
