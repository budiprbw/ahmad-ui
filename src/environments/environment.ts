// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  firebaseConfig : {
    production: false,
    apiKey: "AIzaSyA2Iq4ldWdYiP5i2Ziof6DWbKLfrYzLzoc",
    authDomain: "ahmadproject-317309.firebaseapp.com",
    projectId: "ahmadproject-317309",
    storageBucket: "ahmadproject-317309.appspot.com",
    messagingSenderId: "169518870541",
    appId: "1:169518870541:web:d3e7e2ad40ab35692e6544",
    measurementId: "G-7EZ2Q96LYF" 
  },
  ahmadApi:{
    baseAPIUrl: "http://kidswa.web.id/ahmad-core/public/api/",
    donatur:{
      register:  "donatur/register",
      register_sosmed:"donatur/register/sosmed",
      upload_poto:"donatur/upload/photo",
      find_by_email:"donatur/byemail/",
      update_profile :"donatur/update/profile/",
    },
    santri:{
      register:"santri/register",
      register_sosmed:"santri/register/sosmed",
      upload_poto:"santri/upload/photo",
      find_by_email:"santri/byemail",
      kuesioner_simpan: "kuesioner/santri/simpan",
      update_profile :"santri/update/profile",
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
      list_kuesioner: "kuesioner/list",
      
    },
    user:{
      by_login:"user/login",
      by_hashcode:"user/byhashcode/",
      change_password:"user/change/password/"
    },
    send_wa_message:"message/send/wa"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
