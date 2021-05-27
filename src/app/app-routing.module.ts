import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
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
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
