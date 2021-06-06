import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./webdashboard/webdashboard.module').then( m => m.WebdashboardPageModule)
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
  },
  {
    path: 'confirm-page',
    loadChildren: () => import('./confirm-page/confirm-page.module').then( m => m.ConfirmPagePageModule)
  },
  {
    path: 'dashboard-santri',
    loadChildren: () => import('./dashboard-santri/dashboard-santri.module').then( m => m.DashboardSantriPageModule)
  },
  {
    path: 'buatpassword',
    loadChildren: () => import('./buatpassword/buatpassword.module').then( m => m.BuatpasswordPageModule)
  },
  {
    path: 'detail-berita',
    loadChildren: () => import('./detail-berita/detail-berita.module').then( m => m.DetailBeritaPageModule)
  },
  {
    path: 'donatur-profile',
    loadChildren: () => import('./donatur-profile/donatur-profile.module').then( m => m.DonaturProfilePageModule)
  },
  {
    path: 'dashboard-donatur',
    loadChildren: () => import('./dashboard-donatur/dashboard-donatur.module').then( m => m.DashboardDonaturPageModule)
  },
  {
    path: 'santri-buatpassword',
    loadChildren: () => import('./santri-buatpassword/santri-buatpassword.module').then( m => m.SantriBuatpasswordPageModule)
  },
  {
    path: 'santri-kuesioner',
    loadChildren: () => import('./santri-kuesioner/santri-kuesioner.module').then( m => m.SantriKuesionerPageModule)
  },
  {
    path: 'modalpopup',
    loadChildren: () => import('./modalpopup/modalpopup.module').then( m => m.ModalpopupPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
