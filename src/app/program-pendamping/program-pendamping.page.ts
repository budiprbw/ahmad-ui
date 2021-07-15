import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser'

@Component({
  selector: 'app-program-pendamping',
  templateUrl: './program-pendamping.page.html',
  styleUrls: ['./program-pendamping.page.scss'],
})
export class ProgramPendampingPage implements OnInit {
  public vidurl:any;
  public  urlSafe: SafeResourceUrl;
  public line_berita:any=[];  
  public hadistList:any=[];    
  public noHadist:any=false;
  public referal_kode:any;
  public usrinfo:any;
  public withReferal:boolean=false;

  constructor(
    private router: ActivatedRoute,
    private route : Router,
    public asp: AhmadproviderService,
    public domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.asp.removeUserInfo();
    this.asp.removeItemDonasi();
    this.getBeritaKampanye();
  }
  goBack(){
    this.route.navigateByUrl('/webdashboard', { replaceUrl:true });
  } 
   async getBeritaKampanye(){
    
     await this.asp.getlist_berita_kampanye().then(
      data=> {        
            this.line_berita=data;
            if (!(JSON.stringify(this.line_berita) === '{}')){
                if (this.line_berita.berita_web_link!=null){
                 const iframe =  document.getElementById('embeddedPage') as HTMLIFrameElement;
                  iframe.contentWindow.location.replace(this.line_berita.berita_web_link);  
              }              
            }
      });    
  }
  html_entity(val){
    return this.asp.html_entity(val);    
   }

}
