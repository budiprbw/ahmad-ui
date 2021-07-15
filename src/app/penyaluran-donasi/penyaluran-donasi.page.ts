import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import { ModalController } from '@ionic/angular';
import { ModalJenisDonasiPage } from '../modal-jenis-donasi/modal-jenis-donasi.page';
import { ModalNominalDonasiPage } from '../modal-nominal-donasi/modal-nominal-donasi.page';

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
  public banklist:any=[];
  public bankListSelected:any=[];
  public produk :any;
  public result_temp:any;
  public error_msg:string="";
  public usrinfo:any;
  

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    public modalController: ModalController,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.getProduct();
    this.getBank();    
  }

  goBack() {
    //this.route.navigateByUrl('/dashboard-donatur/tabprogram', { replaceUrl: true });
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
    this.popupjenisdonasi();
  }
  goPopupNominalDonasi() {
    this.popupnominaldonasi();
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
        this.jenis_donasi = data['data'];
        this.jenis_donasi_text = "Donasi " + this.jenis_donasi;
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
        this.nominal_donasi = data['data'];
        this.nominal_donasi_text = "Rp."+this.format_number(parseFloat(this.nominal_donasi));
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
      "donasiproduktemp":donasiproduktemp
    };
    localStorage.setItem("item_donasi", JSON.stringify(item_donasi));
    this.usrinfo = this.asp.getUserInfo();
    if (this.usrinfo){
      this.route.navigateByUrl('/pembayaran-donasi', { replaceUrl: true });
    }
    else{
      this.route.navigateByUrl('/donasi-tanya-akun?login_mode=donatur', { replaceUrl: true });
    }
      
    
    /*
    let navigationExtras: NavigationExtras = {
      state: {
        item_bayar: item_donasi
      }
    };
    this.route.navigate(['pembayaran-donasi'], navigationExtras);
    */
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

}
