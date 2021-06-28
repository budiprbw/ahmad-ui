export const environment = {
  production: true,
  firebaseConfig : {
    production: true,
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
      upload_poto:"donatur/upload/photo/",
      find_by_email:"donatur/byemail/",
      update_profile :"donatur/update/profile/",
    },
    santri:{
      register:"santri/register",
      register_sosmed:"santri/register/sosmed",
      upload_poto:"santri/upload/photo/",
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
      list_berita_kampanye:"berita/kampanye",
      list_kuesioner: "kuesioner/list",     
      lembaga:"lembaga",
      list_rekening_lembaga:"lembaga/rekening/bank"
    },
    user:{
      by_login:"user/login",
      by_login_gmail:"user/login/gmail",
      by_hashcode:"user/byhashcode/",
      change_password:"user/change/password/",
      pesan_aktif: "pesan/aktif/byuser/",
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
    },
    send_wa_message:"message/send/wa"
  }
};
