import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-program-santri',
  templateUrl: './program-santri.page.html',
  styleUrls: ['./program-santri.page.scss'],
})
export class ProgramSantriPage implements OnInit {
  public vidurl:any;
  public line_berita:any=[];  
  public hadistList:any=[];    
  public noHadist:any=false;
  public referal_kode:any;
  public usrinfo:any;
  public withReferal:boolean=false;
  public no_urut:number=1;
  public isPrev: boolean = false;
  public isNext: boolean = true;

  

  constructor(
    public asp: AhmadproviderService,
  ) { }

  ngOnInit() {
    this.asp.removeUserInfo();
    this.asp.removeItemDonasi();
    this.getBeritaKampanye();
  }
  goBack() {
    this.asp.go_page_home();
  }

  async getBeritaKampanye() {
    await this.asp.berita_kampanye_santri(this.no_urut).then(
      data => {
        this.line_berita = data;
        if (!(JSON.stringify(this.line_berita.data) === '{}')) {
          if (this.line_berita.data.berita_lokasi_video != null) {
            const iframe = document.getElementById('embeddedPage') as HTMLIFrameElement;
            iframe.src = this.line_berita.data.berita_lokasi_video;
          }
        }
        else {
          this.no_urut -= 1;
          this.isNext = false;
        }
      });
  }
  async getHadistHariini() {
    await this.asp.getHadist_random("1").then(
      data => {
        let retval: any = data;
        this.hadistList = retval.data;
        if (JSON.stringify(this.hadistList) === '{}') {
          this.noHadist = false;
        }
        else {
          this.noHadist = true;
        }
      });
  }
  html_entity(val) {
    return this.asp.html_entity(val);
  }
  async shareLink() {
    let wsurl = 'program-santri';
    await this.asp.shareLink(wsurl);
  }
  nextvideo() {
    this.no_urut += 1;
    this.isPrev = true;
    this.getBeritaKampanye();
  }
  prevvideo() {
    this.no_urut -= 1;
    this.isNext = true;
    if (this.no_urut > 0) this.getBeritaKampanye();
    else {
      this.isPrev = false;
      this.no_urut += 1;
    }
  }




}
