import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./mainhome/mainhome.module').then( m => m.MainhomePageModule)
  },  
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
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
    path: 'santri-program',
    loadChildren: () => import('./santri-program/santri-program.module').then( m => m.SantriProgramPageModule)
  },
  {
    path: 'pengiriman-status',
    loadChildren: () => import('./pengiriman-status/pengiriman-status.module').then( m => m.PengirimanStatusPageModule)
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
    path: 'gabung/:usertipe/:referal_kode',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
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
  },  
  {
    path: 'daftar/',
    loadChildren: () => import('./daftar/daftar.module').then( m => m.DaftarPageModule)
  },
  {
    path: 'daftar/:usertipe/:idreg',
    loadChildren: () => import('./daftar/daftar.module').then( m => m.DaftarPageModule)
  },
  {
    path: 'registrasi',
    loadChildren: () => import('./registrasi/registrasi.module').then( m => m.RegistrasiPageModule)
  },
  {
    path: 'donasi-tanya-akun',
    loadChildren: () => import('./donasi-tanya-akun/donasi-tanya-akun.module').then( m => m.DonasiTanyaAkunPageModule)
  },
  {
    path: 'modal-konfirmasi-donasi',
    loadChildren: () => import('./modal-konfirmasi-donasi/modal-konfirmasi-donasi.module').then( m => m.ModalKonfirmasiDonasiPageModule)
  },
  {
    path: 'buatpassword',
    loadChildren: () => import('./buatpassword/buatpassword.module').then( m => m.BuatpasswordPageModule)
  },  
  {
    path: 'ajak-gabung',
    loadChildren: () => import('./ajak-gabung/ajak-gabung.module').then( m => m.AjakGabungPageModule)
  },
  {
    path: 'paket-pembelajaran',
    loadChildren: () => import('./paket-pembelajaran/paket-pembelajaran.module').then( m => m.PaketPembelajaranPageModule)
  },
  {
    path: 'donasi-santri',
    loadChildren: () => import('./donasi-santri/donasi-santri.module').then( m => m.DonasiSantriPageModule)
  },
  {
    path: 'dashboard-pendamping',
    loadChildren: () => import('./dashboard-pendamping/dashboard-pendamping.module').then( m => m.DashboardPendampingPageModule)
  },
  {
    path: 'santri-penilaian',
    loadChildren: () => import('./santri-penilaian/santri-penilaian.module').then( m => m.SantriPenilaianPageModule)
  },
  {
    path: 'program-santri',
    loadChildren: () => import('./program-santri/program-santri.module').then( m => m.ProgramSantriPageModule)
  },
  {
    path: 'faq-list',
    loadChildren: () => import('./faq-list/faq-list.module').then( m => m.FaqListPageModule)
  },
  {
    path: 'program-pendamping',
    loadChildren: () => import('./program-pendamping/program-pendamping.module').then( m => m.ProgramPendampingPageModule)
  },
  {
    path: 'view-doa',
    loadChildren: () => import('./view-doa/view-doa.module').then( m => m.ViewDoaPageModule)
  },
  {
    path: 'notifikasi',
    loadChildren: () => import('./notifikasi/notifikasi.module').then( m => m.NotifikasiPageModule)
  },
  {
    path: 'modal-cara-pilih-santri',
    loadChildren: () => import('./modal-cara-pilih-santri/modal-cara-pilih-santri.module').then( m => m.ModalCaraPilihSantriPageModule)
  },
  {
    path: 'pengingat-bimbingan',
    loadChildren: () => import('./pengingat-bimbingan/pengingat-bimbingan.module').then( m => m.PengingatBimbinganPageModule)
  },
  {
    path: 'view-pembayaran-donasi',
    loadChildren: () => import('./view-pembayaran-donasi/view-pembayaran-donasi.module').then( m => m.ViewPembayaranDonasiPageModule)
  },
  {
    path: 'tabprogramsantri',
    loadChildren: () => import('./tabprogramsantri/tabprogramsantri.module').then( m => m.TabprogramsantriPageModule)
  },
  {
    path: 'daftar-santri-penilaian',
    loadChildren: () => import('./daftar-santri-penilaian/daftar-santri-penilaian.module').then( m => m.DaftarSantriPenilaianPageModule)
  },
  {
    path: 'mainhome',
    loadChildren: () => import('./mainhome/mainhome.module').then( m => m.MainhomePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
