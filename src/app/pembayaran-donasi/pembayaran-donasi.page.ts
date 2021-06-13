import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import { ModalController } from '@ionic/angular';
import { ModalUbahBankPage } from '../modal-ubah-bank/modal-ubah-bank.page';

@Component({
  selector: 'app-pembayaran-donasi',
  templateUrl: './pembayaran-donasi.page.html',
  styleUrls: ['./pembayaran-donasi.page.scss'],
})
export class PembayaranDonasiPage implements OnInit {
  private item_bayar:any;
  private jenis_donasi:string="";
  private nominal_donasi:string="";
  private total_donasi:string="";
  private durasi_donasi:string="";
  private qty_donasi:string="";  
  private kode_unik:number=212;  
  private nomimanl_donasi_text:string="";  
  private gran_total:number=0;  
  private gran_total_text:string="";  
  public bank_selected:any;
  public setuju_bayar:string="0";

  constructor(
    public route : ActivatedRoute,
    public router: Router,
    public asp: AhmadproviderService,
    public modalController: ModalController,
  ) { }
  ionViewDidLoad(){
    
  }

  ngOnInit() {
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
  }
  goBack(){
    this.router.navigate(['penyaluran-donasi']);
  }
  format_number(v){
    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');    
  }
  goJadualDonasi(){
    this.router.navigateByUrl('/jadual-pembayaran-donasi', { replaceUrl:true });
  }
  goUbahDonasi(){
    this.router.navigate(['penyaluran-donasi']);
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
      });
    return await modal.present();
  }
  setujuBayar(e){
    this.setuju_bayar="0";
    if (e.detail.checked)
    {
      this.setuju_bayar="1";
    }
  }
  goBayar(){
    this.router.navigateByUrl('/selesai-donasi', { replaceUrl:true });
  }
}
