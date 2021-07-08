import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser'

@Component({
  selector: 'app-donasi-program',
  templateUrl: './donasi-program.page.html',
  styleUrls: ['./donasi-program.page.scss'],
})
export class DonasiProgramPage implements OnInit {
  //public vidurl: string = "https://www.youtube.com/embed/e-KygsbNVGk";
  public vidurl: string="";
  public  urlSafe: SafeResourceUrl;
  public line_berita:any=[];  
  public referal_kode:any;
  public usrinfo:any;
  public withReferal:boolean=false;

  constructor(
    private router: ActivatedRoute,
    private route : Router,
    public asp: AhmadproviderService,
    public domSanitizer: DomSanitizer

  ) { }

  ngOnInit() {
    this.asp.removeUserInfo();
    this.asp.removeItemDonasi();
    this.cek_referal();
    this.getBeritaKampanye();
    this.vidurl=  JSON.parse(localStorage.getItem("videourl"));
    this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.vidurl);      
    //localStorage.removeItem("videourl");
  }
  goBack(){
    this.route.navigateByUrl('/webdashboard', { replaceUrl:true });
  }
  async cek_referal(){
    await this.router.params.subscribe((params: any) => {
      if (params['referal_kode']) {
        this.referal_kode = params['referal_kode'];
        localStorage.setItem("referal_kode",this.referal_kode);        
        this.withReferal=true;
      }

    })
  }
   async getBeritaKampanye(){
    
     await this.asp.getlist_berita_kampanye().then(
      data=> {        
            this.line_berita=data;
            if (!(JSON.stringify(this.line_berita) === '{}')){
                if (this.line_berita.berita_web_link!=null){
                  localStorage.setItem("videourl", JSON.stringify(this.line_berita.berita_web_link));                  
              }              
            }
      });
    
  }

}
