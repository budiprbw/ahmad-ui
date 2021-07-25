import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';
import { ModalController } from '@ionic/angular';
import { ModalUbahBankPage } from '../modal-ubah-bank/modal-ubah-bank.page';

@Component({
  selector: 'app-pembayaran-donasi',
  templateUrl: './pembayaran-donasi.page.html',
  styleUrls: ['./pembayaran-donasi.page.scss'],
})
export class PembayaranDonasiPage implements OnInit {
  public item_bayar:any;
  public jenis_donasi:string="";
  public nominal_donasi:string="";
  public total_donasi:string="";
  public durasi_donasi:string="";
  public qty_donasi:string="";  
  public kode_unik:number=212;  
  public nominal_donasi_text:string="";  
  public gran_total:number=0;  
  public gran_total_text:string="";  
  public bank_selected:any;
  public setuju_bayar:string="0";
  public result_simpan:any;
  public error_msg: string = "";
  public usrinfo:any;
  public user_photoURL: any;
  public user_email: string = "";
  public user_displayName: string = "";
  public login_by: string = "";
  public donasi_tanggal:any;

  constructor(
    public asp: AhmadproviderService,
    public modalController: ModalController,
  ) { }
  
  ngOnInit() {
    this.initUserInfo();
    this.simpanDonasidariTemp();
    /*
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.item_bayar = this.router.getCurrentNavigation().extras.state.item_bayar;

        this.jenis_donasi= this.item_bayar.jenis_donasi;
        this.nominal_donasi= this.format_number(this.item_bayar.nominal_donasi);
        this.total_donasi="Rp." + this.format_number(this.item_bayar.total_donasi);
        this.qty_donasi= this.item_bayar.qty_donasi;
        this.durasi_donasi= this.format_number(this.item_bayar.durasi_donasi);
        let total_bayar = parseFloat(this.item_bayar.nominal_donasi);
        this.gran_total = (total_bayar+this.kode_unik);
        this.gran_total_text ="Rp." + this.format_number(this.gran_total);
        this.bank_selected= this.item_bayar.bank_selected[0];
      }
    });
    */
  }
  initUserInfo()
  {
    this.usrinfo =  this.asp.getUserInfo();   
    this.user_photoURL = this.usrinfo.ref_object.donatur_lokasi_photo;
    this.user_email = this.usrinfo.user_email;
    this.user_displayName = this.usrinfo.user_displayName;
    this.login_by = this.usrinfo.login_by;    
  }
  simpanDonasidariTemp(){
    var temp_donasi_no:string="";
    var item_donasi:any= JSON.parse(localStorage.getItem("item_donasi"));
    if (item_donasi) {
      temp_donasi_no= item_donasi.temp_donasi_no;
      this.jenis_donasi= item_donasi.jenis_donasi_text;
      this.donasi_tanggal =item_donasi.donasi_tanggal;
      this.nominal_donasi= this.format_number(item_donasi.donasi_tagih);
      this.total_donasi="Rp." + this.format_number(item_donasi.donasi_total_harga);
      this.qty_donasi= item_donasi.donasi_jumlah_santri;
      this.durasi_donasi= this.format_number(item_donasi.durasi_donasi);
      let total_bayar = parseFloat(item_donasi.donasi_tagih);
      this.gran_total = (total_bayar+this.kode_unik);
      this.gran_total_text ="Rp." + this.format_number(this.gran_total);      
      this.bank_selected= item_donasi.bank_selected;
      /*
        this.asp.donaturRegisterDonasi(this.user_email,this.user_displayName,temp_donasi_no).then(
            data => {
              this.result_simpan=data;
              if (this.result_simpan.status == 'error') {
                  this.error_msg = this.result_simpan.message;              
              }
              else {
                item_donasi.temp_donasi_no= this.result_simpan.data.temp_donasi_no;
              }
            });     
            */
    }       
  }
  goBack(){
    this.asp.go_page_salurkan_donasi();
  }
  format_number(v){
    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');    
  }
  goJadualDonasi(){
    this.asp.go_page_jadual_pembayaran();
  }
  goUbahDonasi(){    
    this.asp.go_page_salurkan_donasi();
  }
  goUbahBank(){
    this.popupUbahBank();
  }
  async  popupUbahBank() {
    const modal = await this.modalController.create({
      component: ModalUbahBankPage,
      componentProps: {
        'model_title': "Modal ubah bank "
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        this.bank_selected= data['data'][0];
        this.updateRekeningBank();
      });
    return await modal.present();
  }
  updateRekeningBank(){
    var item_donasi:any= JSON.parse(localStorage.getItem("item_donasi"));
    var rekening_id=this.bank_selected.bank_rekening_id;
    var donasi_id=item_donasi.donasi.id;
    let response:any;
    this.asp.donasi_update_rekening(donasi_id,rekening_id).then(data=>{
      response= data;
    });
  }

  
  setujuBayar(e){
    this.setuju_bayar="0";
    if (e.detail.checked)
    {
      this.error_msg="";
      this.setuju_bayar="1";
    }
  }
  goBayar(){
    if (this.setuju_bayar=="1")
    {
      var item_donasi:any= JSON.parse(localStorage.getItem("item_donasi"));
      let donasiproduk=[];
      //donasi_random_santri="0"; dipilihkan sistem
      let item_produk  = {
        "produk_id": item_donasi.donasiproduk[0].id ,
        "donasi_produk_jml": item_donasi.donasi_jumlah_santri,
        "donasi_produk_harga":  item_donasi.donasi_tagih,
        "donasi_produk_total":item_donasi.donasi_total_harga
      };
      donasiproduk.push(item_produk);
      this.asp.simpan_donasi( this.usrinfo.ref_object.id,
        item_donasi.rekening_id,
        item_donasi.donasi_tanggal,
        item_donasi.donasi_jumlah_santri,
        item_donasi.donasi_tagih,
        item_donasi.donasi_total_harga, 
        item_donasi.donasi_cara_bayar,
        donasiproduk,
        item_donasi.donasi_random_santri).then(
          data => {
            this.result_simpan = data;
            if (this.result_simpan.status == 'error') {
              this.error_msg = this.result_simpan.message;              
            }
            else {
              //console.log(item_donasi);
              item_donasi.donasi= this.result_simpan.data;              
              localStorage.setItem("item_donasi", JSON.stringify(item_donasi));                                  
            }
          });  
      this.asp.go_page_selesai_donasi();
    }
    else
    {
      this.error_msg="Silahkan checklist persetujuan bayar";
    }
    
  }
}
