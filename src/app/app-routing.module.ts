import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
  },
  {
    path: 'santri-akun',
    loadChildren: () => import('./santri-akun/santri-akun.module').then( m => m.SantriAkunPageModule)
  },
  {
    path: 'santri-profile',
    loadChildren: () => import('./santri-profile/santri-profile.module').then( m => m.SantriProfilePageModule)
  },
  {
    path: 'santri-reg-info',
    loadChildren: () => import('./santri-reg-info/santri-reg-info.module').then( m => m.SantriRegInfoPageModule)
  },
  {
    path: 'santri-notifikasi',
    loadChildren: () => import('./santri-notifikasi/santri-notifikasi.module').then( m => m.SantriNotifikasiPageModule)
  },
  {
    path: 'santri-program',
    loadChildren: () => import('./santri-program/santri-program.module').then( m => m.SantriProgramPageModule)
  },
  {
    path: 'pengiriman-status',
    loadChildren: () => import('./pengiriman-status/pengiriman-status.module').then( m => m.PengirimanStatusPageModule)
  },
  {
    path: 'donatur-notifikasi',
    loadChildren: () => import('./donatur-notifikasi/donatur-notifikasi.module').then( m => m.DonaturNotifikasiPageModule)
  },
  {
    path: 'donasi-list',
    loadChildren: () => import('./donasi-list/donasi-list.module').then( m => m.DonasiListPageModule)
  },
  {
    path: 'donasi-detail',
    loadChildren: () => import('./donasi-detail/donasi-detail.module').then( m => m.DonasiDetailPageModule)
  },
  {
    path: 'donasi-riwayat',
    loadChildren: () => import('./donasi-riwayat/donasi-riwayat.module').then( m => m.DonasiRiwayatPageModule)
  },
  {
    path: 'donasi-program',
    loadChildren: () => import('./donasi-program/donasi-program.module').then( m => m.DonasiProgramPageModule)
  },
  {
    path: 'donasi-santri-list',
    loadChildren: () => import('./donasi-santri-list/donasi-santri-list.module').then( m => m.DonasiSantriListPageModule)
  },
  {
    path: 'pengiriman-status-donasi',
    loadChildren: () => import('./pengiriman-status-donasi/pengiriman-status-donasi.module').then( m => m.PengirimanStatusDonasiPageModule)
  },
  {
    path: 'penyaluran-donasi',
    loadChildren: () => import('./penyaluran-donasi/penyaluran-donasi.module').then( m => m.PenyaluranDonasiPageModule)
  },
  {
    path: 'pembayaran-donasi',
    loadChildren: () => import('./pembayaran-donasi/pembayaran-donasi.module').then( m => m.PembayaranDonasiPageModule)
  },
  {
    path: 'jadual-pembayaran-donasi',
    loadChildren: () => import('./jadual-pembayaran-donasi/jadual-pembayaran-donasi.module').then( m => m.JadualPembayaranDonasiPageModule)
  },
  {
    path: 'pengingat-donasi',
    loadChildren: () => import('./pengingat-donasi/pengingat-donasi.module').then( m => m.PengingatDonasiPageModule)
  },
  {
    path: 'pengiriman-status-detail',
    loadChildren: () => import('./pengiriman-status-detail/pengiriman-status-detail.module').then( m => m.PengirimanStatusDetailPageModule)
  },
  {
    path: 'detail-penerima-donasi',
    loadChildren: () => import('./detail-penerima-donasi/detail-penerima-donasi.module').then( m => m.DetailPenerimaDonasiPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'modal-jenis-donasi',
    loadChildren: () => import('./modal-jenis-donasi/modal-jenis-donasi.module').then( m => m.ModalJenisDonasiPageModule)
  },
  {
    path: 'modal-nominal-donasi',
    loadChildren: () => import('./modal-nominal-donasi/modal-nominal-donasi.module').then( m => m.ModalNominalDonasiPageModule)
  },
  {
    path: 'modal-ubah-bank',
    loadChildren: () => import('./modal-ubah-bank/modal-ubah-bank.module').then( m => m.ModalUbahBankPageModule)
  },
  {
    path: 'selesai-donasi',
    loadChildren: () => import('./selesai-donasi/selesai-donasi.module').then( m => m.SelesaiDonasiPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
