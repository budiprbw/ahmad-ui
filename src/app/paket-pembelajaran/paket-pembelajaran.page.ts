import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';


declare var loadExternalJs;
@Component({
  selector: 'app-paket-pembelajaran',
  templateUrl: './paket-pembelajaran.page.html',
  styleUrls: ['./paket-pembelajaran.page.scss'],
})
export class PaketPembelajaranPage implements OnInit {

  public line_berita:any=[];  
  public usrinfo:any;
  public referal_kode: any;
  public withReferal:boolean=false;
  public no_urut:number=1;
  public isPrev: boolean = false;
  public isNext: boolean = true;
  public berita_isi:any;
  public berita_judul:any;
  
  constructor(
    public asp: AhmadproviderService,
  ) { }

  ngOnInit() {
    this.asp.removeUserInfo();
    this.asp.removeItemDonasi();
    this.cek_referal();
    this.getBeritaKampanye();
  }
  ngAfterViewInit() {
    loadExternalJs();
  }
  cek_referal() {
    this.referal_kode=localStorage.getItem("referal_kode");
    if (this.referal_kode) // via referal
    {
        this.withReferal = true;
    }
  }
  goBack() {
    this.asp.go_page_home();
  }
  async getBeritaKampanye() {
    
    let nomor: string= this.no_urut.toString().padStart(2, '0');
    await this.asp.berita_kampanye_donatur(nomor).then(
      data => {
        this.line_berita = data;
        if (!(JSON.stringify(this.line_berita.data) === '{}')) {
          if (this.line_berita.data.berita_lokasi_video != null) {
            const iframe = document.getElementById('embeddedPage') as HTMLIFrameElement;
            iframe.src= this.line_berita.data.berita_lokasi_video;
            this.berita_isi= this.line_berita.data.berita_isi;
            this.berita_judul= this.line_berita.data.berita_judul;
          }
        }
        else
        {
          this.no_urut-=1;
          this.isNext=false;
        }
      });
  }
  readMore(item){
    this.asp.go_page_view_doa(item);
  }

  async shareLink(){
    let wsurl='paket-pembelajaran';
    await this.asp.shareLink(wsurl);
  }
  nextvideo(){
    this.no_urut+=1;
    this.isPrev=true;
    this.getBeritaKampanye();
  }
  prevvideo(){
    this.no_urut-=1;
    this.isNext=true;
    if (this.no_urut>0)this.getBeritaKampanye();
    else {
      this.isPrev=false;
      this.no_urut+=1;
    }
  }

  html_entity(val) {
    return this.asp.html_entity(val);
  }


}
