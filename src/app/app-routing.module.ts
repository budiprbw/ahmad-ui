import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./mobiledashboard/mobiledashboard.module').then( m => m.MobiledashboardPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'santrilogin',
    loadChildren: () => import('./santrilogin/santrilogin.module').then( m => m.SantriloginPageModule)
  },
  {
    path: 'donaturlogin',
    loadChildren: () => import('./donaturlogin/donaturlogin.module').then( m => m.DonaturloginPageModule)
  },
  {
    path: 'isiprofile',
    loadChildren: () => import('./isiprofile/isiprofile.module').then( m => m.IsiprofilePageModule)
  },
  {
    path: 'donaturreg',
    loadChildren: () => import('./donaturreg/donaturreg.module').then( m => m.DonaturregPageModule)
  },
  {
    path: 'santrireg',
    loadChildren: () => import('./santrireg/santrireg.module').then( m => m.SantriregPageModule)
  },
  {
    path: 'webdashboard',
    loadChildren: () => import('./webdashboard/webdashboard.module').then( m => m.WebdashboardPageModule)
  },
  {
    path: 'mobiledashboard',
    loadChildren: () => import('./mobiledashboard/mobiledashboard.module').then( m => m.MobiledashboardPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
