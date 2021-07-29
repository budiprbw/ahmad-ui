import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';
import { ModalController } from '@ionic/angular';
import { ModalJenisDonasiPage } from '../modal-jenis-donasi/modal-jenis-donasi.page';
import { ModalNominalDonasiPage } from '../modal-nominal-donasi/modal-nominal-donasi.page';
import { ModalCaraPilihSantriPage } from '../modal-cara-pilih-santri/modal-cara-pilih-santri.page';

@Component({
  selector: 'app-penyaluran-donasi',
  templateUrl: './penyaluran-donasi.page.html',
  styleUrls: ['./penyaluran-donasi.page.scss'],
})
export class PenyaluranDonasiPage implements OnInit {
  public currentNumber: number = 0;
  public total_donasi: number = 0;
  public harga_paket: number = 800000;
  public produk_id:any;
  public harga_paket_text: string = "";
  public jenis_donasi: string = "";
  public jenis_donasi_text: string = "Pilih Jenis Donasi";
  public nominal_donasi: string = "";
  public nominal_donasi_text: string = "Pilih Nominal Donasi";
  public donasi_random_santri_text: string = "Pilih Santri";
  public banklist:any=[];
  public bankListSelected:any=[];
  public produk :any;
  public result_temp:any;
  public error_msg:string="";
  public usrinfo:any;
  public donasi_random_santri:string="";
  public pilih_santri:boolean=false;
  

  constructor(
    public modalController: ModalController,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.getProduct();
    this.getBank();    
  }

  goBack() {    
    this.asp.go_previous_page();
  }
  decrement() {
    this.currentNumber--;
    if (this.currentNumber<0) this.currentNumber=0;
    this.totalan();
  }
  increment() {
    this.currentNumber++;
    this.totalan();
  }
  totalan() {
    this.total_donasi = this.currentNumber * this.harga_paket;
  }
  goPopupJenisDonasi() {
    if (this.currentNumber>0){
      this.popupjenisdonasi();
    }
    else
    {
      this.asp.presentToast("total donasi tidak boleh 0");
    }
    
  }
  goPopupNominalDonasi() {
    if (this.jenis_donasi=="")
    {
      this.asp.presentToast("Pilih Jenis Donasi terlebih dahulu");
    }
    else
    {
      if (this.jenis_donasi!="Penuh") this.popupnominaldonasi();
    }
  }
  async  popupjenisdonasi() {
    const modal = await this.modalController.create({
      component: ModalJenisDonasiPage,
      componentProps: {
        'model_title': "Modal Jenis Donasi "
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data['data']!=null)
        {
            this.jenis_donasi = data['data'];
            this.jenis_donasi_text = "Donasi " + this.jenis_donasi;
            this.pilih_santri=false;
            if (this.jenis_donasi=="Penuh"){
              this.nominal_donasi=this.total_donasi.toString();
              this.nominal_donasi_text = "Rp."+this.format_number(parseFloat(this.nominal_donasi));
              this.pilih_santri=true;
            }
          }
      });
    return await modal.present();
  }

  async  popupnominaldonasi() {
    const modal = await this.modalController.create({
      component: ModalNominalDonasiPage,
      componentProps: {
        'model_title': "Modal Nominal Donasi "
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data['data']!=null)
        {
          this.nominal_donasi = data['data'];       
          this.nominal_donasi_text = "Rp."+this.format_number(parseFloat(this.nominal_donasi));
        }        
      });
    return await modal.present();
  }

  async  popupPilihSantri() {
    const modal = await this.modalController.create({
      component: ModalCaraPilihSantriPage,
      componentProps: {
        'model_title': "Modal Pemilihan Santri"
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data['data']!=null)
        {
          this.donasi_random_santri = data['data'];       
          if ( this.donasi_random_santri=="0"){
            this.donasi_random_santri_text= "Dipilihkan System";
          }
          if ( this.donasi_random_santri=="1"){
            this.donasi_random_santri_text= "Memilih Sendiri";
          }            
        }
      });
    return await modal.present();
  }
  
  getTotal(event: number){        
    console.log(event);
    if (event<0){
      event=0;
    }
    this.currentNumber=event;
    this.totalan();
  }
  format_number(v){
    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');    
  }
  caraBayarCode(str){
    var cara_bayar:string="";
    switch (str) {
      case "Harian":
        cara_bayar="1";
        break;
      case "Pekanan":
        cara_bayar="2";
        break;
      case "Bulanan":
        cara_bayar="3";
        break;
      case "Penuh":
        cara_bayar="4";
        break;
    }
    return cara_bayar;
  }
  goLanjutkan(){
    if (this.validateInput()) this.save_local_storage();        
  }
  validateInput(){
    let retVal:boolean=false;
    let msg="";
    var newLine = "<br>"
    if (this.currentNumber==0) msg+= newLine +"total donasi";    
    if (this.jenis_donasi=="")  msg+= newLine +"jenis donasi";
    if (this.nominal_donasi=="")  msg+= newLine +"nominal donasi";
    if (this.jenis_donasi=="Penuh")
    {
      if (this.donasi_random_santri=="") msg+= newLine +"pilih santri";
    }    
    if (this.bankListSelected.length==0)
    {
      msg+= newLine +"pilih rekening pembayaran";
    }
    if (msg!="")
    {
      msg="Silahkan check inputan" +msg;
      this.error_msg=msg;
    }
    else{
      retVal=true;
    }
    return retVal;
  }

  save_local_storage(){
    let nominal_donasi= parseFloat(this.nominal_donasi);
    let durasi_donasi=( this.total_donasi/nominal_donasi);
    let d:Date =  new Date();
    var today = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();    
    var cara_bayar=this.caraBayarCode(this.jenis_donasi);    
    let item_produk_list=[];
    let donasiproduktemp:any=[];
    let item_produk={
      "id": this.produk.data.id,
      "donasi_produk_jml": this.currentNumber,
      "donasi_produk_harga": nominal_donasi,
      "donasi_produk_total": this.total_donasi,
    }
    item_produk_list.push(item_produk);
    let item_produk_temp = {
      "produk_id": this.produk.data.id ,
      "temp_donasi_produk_jml": this.currentNumber,
      "temp_donasi_produk_harga": this.harga_paket,
      "temp_donasi_produk_total": this.total_donasi
    };
    donasiproduktemp.push(item_produk_temp);    
    if (this.donasi_random_santri=="")this.donasi_random_santri="0";
    let item_donasi = {
      "donasi_tanggal": today ,
      "donasi_cara_bayar": cara_bayar,
      "jenis_donasi_text": this.jenis_donasi_text,
      "donasi_tagih": nominal_donasi,
      "donasi_total_harga": this.total_donasi,
      "donasi_jumlah_santri": this.currentNumber,
      "temp_donasi_nominal": this.currentNumber,
      "durasi_donasi":durasi_donasi,
      "bank_selected":this.bankListSelected[0],
      "rekening_id":this.bankListSelected[0].id,
      "temp_donasi_no":"",
      "donasiproduk":item_produk_list,
      "donasiproduktemp":donasiproduktemp,
      "donasi_random_santri":this.donasi_random_santri
    };
    localStorage.setItem("item_donasi", JSON.stringify(item_donasi));
    this.usrinfo = this.asp.getUserInfo();
    if (this.usrinfo){
      this.asp.go_page_donasi_pembayaran();
    }
    else{
      this.asp.go_page_donasi_tanya_akun();
    }            
  }
  getProduct(){
    this.asp.produk_by_id(1).then(
      data=> {        
            this.produk=data;
            this.harga_paket= this.produk.data.produk_harga;    
            this.harga_paket_text= this.format_number(this.harga_paket);  
      });
  }
  getBank(){
    this.asp.getlist_rekening_lembaga().then(
      data=> {        
        this.banklist=data;
      });    
  }
  public radioGroupChange(e){ 
    let no_rekening_selected=e.detail.value;
    this.bankListSelected=[];
    for(let i =0; i <= this.banklist.length-1; i++) {
      if (this.banklist[i].rekening_no == no_rekening_selected)
      {
        this.banklist[i].is_selected='1';
        this.bankListSelected.push(this.banklist[i]);
      }
      else{
        this.banklist[i].is_selected='0';
      }
    }
  }
  html_entity(val)
  {
    return this.asp.html_entity(val);
  }

}
