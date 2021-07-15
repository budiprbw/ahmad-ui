import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-donasi-program',
  templateUrl: './donasi-program.page.html',
  styleUrls: ['./donasi-program.page.scss'],
})
export class DonasiProgramPage implements OnInit {
  //public vidurl: string = "https://www.youtube.com/embed/e-KygsbNVGk";
  public vidurl: any;
  public urlSafe: SafeResourceUrl;
  public line_berita: any = [];
  public referal_kode: any;
  public usrinfo: any;
  public withReferal: boolean = false;
  public hadistList: any = [];
  public noHadist: any = false;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    public asp: AhmadproviderService,
    public domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.asp.removeUserInfo();
    this.asp.removeItemDonasi();
    this.cek_referal();
    this.getBeritaKampanye();
    this.getHadistHariini();
    /*
    this.vidurl=  JSON.parse(localStorage.getItem("videourl"));
    this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.vidurl);      
    localStorage.removeItem("videourl");
   */
  }
  goBack() {
    this.route.navigateByUrl('/webdashboard', { replaceUrl: true });
  }
   cek_referal() {
    this.referal_kode=localStorage.getItem("referal_kode");
    if (this.referal_kode) // via referal
    {
        this.withReferal = true;
    }
  }

  async getBeritaKampanye() {

    await this.asp.getlist_berita_kampanye().then(
      data => {
        this.line_berita = data;
        if (!(JSON.stringify(this.line_berita) === '{}')) {
          if (this.line_berita.berita_web_link != null) {
            /*
            this.vidurl= JSON.stringify(this.line_berita.berita_web_link);
            localStorage.setItem("videourl", JSON.stringify(this.line_berita.berita_web_link));                  
            this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.line_berita.berita_web_link);  
            */
            const iframe = document.getElementById('embeddedPage') as HTMLIFrameElement;
            iframe.contentWindow.location.replace(this.line_berita.berita_web_link);
          }
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


}
