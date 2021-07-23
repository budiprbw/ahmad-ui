import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';


@Component({
  selector: 'app-paket-pembelajaran',
  templateUrl: './paket-pembelajaran.page.html',
  styleUrls: ['./paket-pembelajaran.page.scss'],
})
export class PaketPembelajaranPage implements OnInit {

  public line_berita:any=[];  
  public usrinfo:any;
  public withReferal:boolean=false;
  
  constructor(
    public asp: AhmadproviderService,
  ) { }

  ngOnInit() {
    this.getBeritaKampanye();
  }
  goBack() {
    this.asp.go_page_home();
  }
  async getBeritaKampanye() {
    await this.asp.getlist_berita_kampanye().then(
      data => {
        this.line_berita = data;
        if (!(JSON.stringify(this.line_berita) === '{}')) {
          if (this.line_berita.berita_web_link != null) {
            const iframe = document.getElementById('embeddedPage') as HTMLIFrameElement;
            iframe.contentWindow.location.replace(this.line_berita.berita_web_link);
          }
        }
      });
  }

  html_entity(val) {
    return this.asp.html_entity(val);
  }


}
