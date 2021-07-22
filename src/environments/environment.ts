// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyA2Iq4ldWdYiP5i2Ziof6DWbKLfrYzLzoc",
    authDomain: "ahmadproject-317309.firebaseapp.com",
    projectId: "ahmadproject-317309",
    storageBucket: "ahmadproject-317309.appspot.com",
    messagingSenderId: "169518870541",
    appId: "1:169518870541:web:d3e7e2ad40ab35692e6544",
    measurementId: "G-7EZ2Q96LYF"    
  },
  ahmadApi:{
    AppUrl: "https://dev.ahmadproject.org/",
    baseAPIUrl: "https://dev.ahmadproject.org/public/api/",
    donatur:{
      register:  "donatur/register",
      donatur_register_gmail:"donatur/register/gmail",
      upload_poto:"donatur/upload/photo",
      find_by_email:"donatur/byemail/",
      donatur_find_by_id:"donatur/byid/",
      update_profile :"donatur/update/profile/",      
      register_referal:"donatur/register/referral",
      register_donasi_referal:"donatur/register/donasi/referral",
      hadist_by_donaturid:"hadist/entitas/donatur/",
      bimbingan_list_santri_bydonaturid:"bimbingan/list/santri/donatur/"
    },
    santri:{
      register:"santri/register",
      santri_register_gmail:"santri/register/gmail",
      upload_poto:"santri/upload/photo",
      find_by_email:"santri/byemail",
      kuesioner_simpan: "kuesioner/santri/simpan",
      update_profile :"santri/update/profile",
      register_referal:"santri/register/referral",      
      bimbingan_progress : "bimbingan/dashboard/santri/",
      bimbingan_penilaian :"bimbingan/penilaian/santri",
      hadist_by_santriid: "hadist/entitas/santri/"
    },
    pendamping:{
      santri_by_pendampingId: "pendamping/santri/byid/",
      hadist_by_pendampingId:"hadist/entitas/pendamping/"
    },
    lookup:{
      kode_pos:{
        all_propinsi: "kodepos/list/provinsi/all",
        kotabyprovinsi :"kodepos/kotabyprovinsi/",
        kecamatanbykota :"kodepos/kecamatanbykota/",
        kelurahanbykecamatan :"kodepos/kelurahanbykecamatan/",
        kodeposbykelurahan:"kodepos/kodeposbykelurahan/",
      },
      list_berita: "berita/list",      
      list_berita_kampanye:"berita/kampanye",
      list_berita_entitas:"berita/entitas/",
      list_kuesioner: "kuesioner/list",
      lembaga:"lembaga",
      list_rekening_lembaga:"lembaga/rekening/bank",
      list_materi:"materi/list",
      pengingat_list:"pengingat/list",
      hadist_random:"hadist/random/"
    },
    user:{
      by_login:"user/login",
      by_login_gmail:"user/login/gmail",
      by_hashcode:"user/byhashcode/",
      change_password:"user/change/password/",
      pesan_aktif: "pesan/aktif/byuser/",
      update_as_read :"pesan/update/read/",
    },
    product:{
      by_id :"produk/byid/"
    },
    donasi:{
      save_temp:"donasi/temp/save",
      simpan:"donasi/save",
      registrasi_donatur:"donatur/register/donasi",
      update_rekening: "donasi/update/rekening/",
      by_donasiid_donaturid: "donasi/donasiid/",
      cicilan_donaturid: "donasi/cicilan/donatur/",     
      list_santri_by_donasiid:"donasi/santri/"
    },
    send_wa_message:"message/send/wa",
    referal_send_link : "referral/send/link"
  },
  socialShareOption: [
    {
        title: 'Whatsapp',
        logo: 'assets/socialShare/whatsapp-icon-280x280.png',
        shareType: 'shareViaWhatsApp'
    },
    {
        title: 'Facebook',
        logo: 'assets/socialShare/facebook1-280x280.png',
        shareType: 'shareViaFacebook'
    },
    {
        title: 'Twitter',
        logo: 'assets/socialShare/twitter.png',
        shareType: 'shareViaTwitter'
    },
    {
        title: 'Instagram',
        logo: 'assets/socialShare/Instagram-circle.png',
        shareType: 'shareViaInstagram'
    },
    {
        title: 'Email',
        logo: 'assets/socialShare/mail.png',
        shareType: 'viaEmail'
    }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
