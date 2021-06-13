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
  public jenis_donasi: string = "";
  public jenis_donasi_text: string = "Pilih Jenis Donasi";
  public nominal_donasi: string = "";
  public nominal_donasi_text: string = "Pilih Nominal Donasi";
  public banklist:any=[];
  public bankListSelected:any=[];

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    public modalController: ModalController,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.initialBankList();
  }
  goBack() {
    this.route.navigateByUrl('/dashboard-donatur/tabprogram', { replaceUrl: true });
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
        this.jenis_donasi_text = "DONASI " + this.jenis_donasi;
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
  goLanjutkan(){
    let nominal_donasi= parseFloat(this.nominal_donasi);
    let durasi_donasi=( this.total_donasi/nominal_donasi);
    let item_bayar = {
      "jenis_donasi": this.jenis_donasi_text,
      "nominal_donasi": nominal_donasi,
      "total_donasi": this.total_donasi,
      "qty_donasi": this.currentNumber,
      "durasi_donasi":durasi_donasi,
      "bank_selected":this.bankListSelected
    };
    let navigationExtras: NavigationExtras = {
      state: {
        item_bayar: item_bayar
      }
    };
    this.route.navigate(['pembayaran-donasi'], navigationExtras);
  }
  initialBankList(){
    let row1 ={      
      "nama_bank":"BANK BSI",
      "no_rekening": "00000-090000-00001",
      "atas_nama": "Bagus Baskara",    
      "is_selected":'0',
    };
    this.banklist.push(row1);
    let row2 ={
      "nama_bank":"BANK Mandiri",
      "no_rekening": "00000-090000-00002",
      "atas_nama": "Bagus Lesmana",    
      "is_selected":'0',
    };
    this.banklist.push(row2);
    let row3 ={
      "nama_bank":"BANK BCA",
      "no_rekening": "00000-090000-00003",
      "atas_nama": "Bagus Prasetia",    
      "is_selected":'0',
    };
    this.banklist.push(row3);
    let row4 ={
      "nama_bank":"BANK BNI",
      "no_rekening": "00000-090000-00004",
      "atas_nama": "Bagus Dramawan",    
      "is_selected":'0',
    };
    this.banklist.push(row4);
    let row5 ={
      "nama_bank":"BANK BRI",
      "no_rekening": "00000-090000-00005",
      "atas_nama": "Bagus Prahara",    
      "is_selected":'0',
    };
    this.banklist.push(row5);
  }
  public radioGroupChange(e){ 
    let no_rekening_selected=e.detail.value;
    this.bankListSelected=[];
    for(let i =0; i <= this.banklist.length-1; i++) {
      if (this.banklist[i].no_rekening == no_rekening_selected)
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
