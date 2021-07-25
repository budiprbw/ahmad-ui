import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-pembayaran-donasi',
  templateUrl: './view-pembayaran-donasi.page.html',
  styleUrls: ['./view-pembayaran-donasi.page.scss'],
})
export class ViewPembayaranDonasiPage implements OnInit {
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
  public bank_selected:any=[];
  public setuju_bayar:string="0";
  public result_simpan:any;
  public error_msg: string = "";
  public usrinfo:any;
  public user_photoURL: any;
  public user_email: string = "";
  public user_displayName: string = "";
  public login_by: string = "";
  public donasi_id:any;
  public banklist:any;
  public item_donasi:any;
  public  donasi_tanggal:any;

  constructor(
    public asp: AhmadproviderService,
    public route : Router,
    public router: ActivatedRoute,
  ) { }

  ngOnInit() {    
    this.initUserInfo();    
    this.loadDataBayar();
  }
  initUserInfo()
  {
    this.usrinfo =  this.asp.getUserInfo();   
    this.user_photoURL = this.usrinfo.ref_object.donatur_lokasi_photo;
    this.user_email = this.usrinfo.user_email;
    this.user_displayName = this.usrinfo.user_displayName;
    this.login_by = this.usrinfo.login_by;    
  }
  loadDataBayar(){
    this.router.queryParams.subscribe(params => {
      if (this.route.getCurrentNavigation().extras.state) {
            this.item_donasi = this.route.getCurrentNavigation().extras.state.item_donasi;
            let kode_unik:number=212;
            let durasi_donasi:number= 0;
            this.donasi_tanggal=this.item_donasi.donasi_tanggal;
            durasi_donasi=this.item_donasi.donasi_total_harga/this.item_donasi.donasi_nominal;
            let cara_bayar =this.item_donasi.donasi_cara_bayar;
              switch (cara_bayar) {
                case "1":
                  this.jenis_donasi = "Donasi " + "harian";
                  break;
                case "2":
                  this.jenis_donasi = "Donasi " + "pekanan";
                  break;
                case "3":
                  this.jenis_donasi = "Donasi " + "bulanan";
                  break;
                case "4":
                  this.jenis_donasi = "Donasi " + "penuh";
                  break;
              }
            this.nominal_donasi= this.format_number(this.item_donasi.donasi_nominal);
            this.total_donasi="Rp." + this.format_number(this.item_donasi.donasi_total_harga);
            this.qty_donasi= this.item_donasi.donasi_jumlah_santri;
            this.durasi_donasi= this.format_number(durasi_donasi);
            let total_bayar = parseFloat(this.item_donasi.donasi_nominal);
            this.gran_total = (total_bayar+kode_unik);
            this.gran_total_text ="Rp." + this.format_number(this.gran_total);     
            this.getBank();
            
      }
    });
    
  }
  getBank(){
      this.asp.getlist_rekening_lembaga().then(
      data=> {        
        this.banklist=data;
        for(let i =0; i <= this.banklist.length-1; i++) {
          if (this.banklist[i].id == this.item_donasi.rekening_id)
          {
            this.bank_selected= this.banklist[i];                     
            break;
          }
        }
      });    
  }
  format_number(v){
    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');    
  }
  goBack(){
    this.asp.go_previous_page();
  }
  goJadualDonasi(){
    this.asp.go_page_donasi_detail(this.item_donasi);    
  }
}
