import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser'


@Component({
  selector: 'app-paket-pembelajaran',
  templateUrl: './paket-pembelajaran.page.html',
  styleUrls: ['./paket-pembelajaran.page.scss'],
})
export class PaketPembelajaranPage implements OnInit {

  public line_berita:any=[];  
  public usrinfo:any;
  public withReferal:boolean=false;
  public hadistList:any=[];    
  public noHadist:any=false;

  constructor(
    private router: ActivatedRoute,
    private route : Router,
    public asp: AhmadproviderService,
    public domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getBeritaKampanye();
    this.getHadistHariini();    
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
  async getHadistHariini(){
    await this.asp.getHadist_random("1").then(
      data=> {        
        let retval:any=data;
        this.hadistList=retval.data;
        if (JSON.stringify(this.hadistList) === '{}') 
        {
          this.noHadist  =false;
        }
        else
        {
          this.noHadist  =true;
        }
      });   
  }
  html_entity(val){
    return this.asp.html_entity(val);    
   }


}
