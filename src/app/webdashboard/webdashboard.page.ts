import { Component, OnInit,ViewChild  } from '@angular/core';
import { IonContent,Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AhmadproviderService } from '../ahmadprovider.service';
import { SocialShareComponent } from '../components/social-share/social-share.component';

@Component({
  selector: 'app-webdashboard',
  templateUrl: './webdashboard.page.html',
  styleUrls: ['./webdashboard.page.scss'],
})
export class WebdashboardPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  
  backToTop: boolean = false;
  public line_data_lembaga:any=[];
  public ask_question: any = [];
  public images_carousel:any=[];
  public shownGroup:null;
  public is_dark_mode:string ='0';
  public no_data_lembaga:boolean=false;

  public slideOptsOne = {
          initialSlide: 0,
          slidesPerView: 1,
          autoplay: {
            disableOnInteraction: false,
            loop :true,
          },
        };

  constructor(
    private platform:Platform,
    public modalCtrl: ModalController,
    public asp: AhmadproviderService,
  ) { }


  ngOnInit() {
    this.asp.clearLocalstorage();
    this.initDataLembaga();
    this.toggleGroup(0);
    this.cekDarkMode();
  }

  async initDataLembaga(){
    await this.asp.get_lembaga().then(
      data=> {        
            this.line_data_lembaga=data;
            if (this.line_data_lembaga) this.no_data_lembaga  =true;
            this.initialdataCarousel();
            this.initialdataQuestion();
      });
  }

  initialdataCarousel(){
    let row1 ={
      "image_santri": "assets/images/image-santri.webp",
      "carousel_title": this.line_data_lembaga.lembaga_landing_santri_judul,
      "carousel_content":this.line_data_lembaga.lembaga_landing_santri_isi
    };
    this.images_carousel.push(row1);
    let row2 ={
      "image_santri": "assets/images/image-santri-2.webp",
      "carousel_title":this.line_data_lembaga.lembaga_landing_pendamping_judul,
      "carousel_content":this.line_data_lembaga.lembaga_landing_pendamping_isi
    };
    this.images_carousel.push(row2);
  }
  initialdataQuestion(){
    this.ask_question=this.line_data_lembaga.faq;
  }
  toggleGroup(group) {    
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {    
      return this.shownGroup === group;
  };
  cekDarkMode(){
    let is_dark_mode=this.asp.isDarkMode();  
    if (is_dark_mode=='1') this.asp.seDarkMode();
  }
  darkmode()
  { 
    this.is_dark_mode=this.asp.isDarkMode();          
    if (this.is_dark_mode=='0')
    {
      /* ionic css     */
      this.asp.seDarkMode();      
      this.is_dark_mode='1';
    }
    else{
      /* document.body.setAttribute('color-theme','light');  */      
      this.is_dark_mode='0';
      this.asp.removeDarkMode();
    }      
  }
  getScrollPos(event:any) {
    const pos = event.detail.scrollTop;
    if (pos > this.platform.height()) {
         this.backToTop = true;
    } else {
         this.backToTop = false;
    }
}
  gotToTop()
  {       
    this.content.scrollToTop(1500);
  }
  html_entity(val){
     return this.asp.html_entity(val);
  }

  async showShareOptions(mode) {
    let wsurl='';
    if (mode=='donatur'){
      wsurl='donasi-program';
    }
    if (mode=='santri'){
      wsurl='program-santri';
    }
    if (this.platform.is('desktop')) {
      const modal = await this.modalCtrl.create({
        component: SocialShareComponent,
        componentProps: { 
          value: wsurl        
        },
        cssClass: 'backTransparent',
        backdropDismiss: true
      });
      return modal.present();
    }
    else
    {
      this.asp.shareLink(wsurl);
    }
  }  
  
 async shareLink(mode){      
      let wsurl='';
      if (mode=='donatur'){
        wsurl='donasi-program';
      }
      if (mode=='santri'){
        wsurl='program-santri';
      }
      this.asp.shareLink(wsurl);      
  }

  // setMetaTag(){   
  //   this.titleService.setTitle('AHMad Project');
  //   this.metaService.addTag({ property: 'og:url', content: "https://dev.ahmadproject.org"});
  //   this.metaService.addTag({ name: 'title', content: 'AHMad Project (Asmaul husna dan Doa)' });
  //   this.metaService.addTag({ name: 'description', content: 'AHMad Project (Asmaul husna dan Doa)' });
  //   this.metaService.addTag({ name: 'robots', content: 'index,follow' });
  //   this.metaService.addTag({ property: 'og:image', content: 'https://dev.ahmadproject.org/assets/images/ahmad-project.png'});
  // }  
gotoKontak(css_nm){
  
  document.querySelector(css_nm).scrollIntoView({ 
    behavior: 'smooth', block: 'nearest', inline: 'end'
  });
}  

}
