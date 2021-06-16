import { Component, OnInit,ViewChild  } from '@angular/core';
import { IonContent} from '@ionic/angular';

@Component({
  selector: 'app-webdashboard',
  templateUrl: './webdashboard.page.html',
  styleUrls: ['./webdashboard.page.scss'],
})
export class WebdashboardPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  public ask_question: any = [];
  public images_carousel:any=[];
  public shownGroup:null;
  public is_dark_mode:string ='0';
  public slideOptsOne = {
          initialSlide: 0,
          slidesPerView: 1,
          autoplay: {
            disableOnInteraction: false,
            loop :true,
          },
        };
  constructor( ) { }


  ngOnInit() {
    this.initialdataQuestion();
    this.initialdataCarousel();
    this.toggleGroup(0);
  }
  initialdataCarousel(){
    let row1 ={
      "image_santri": "assets/images/image-santri.webp",
      "carousel_title":"Program Santri",
      "carousel_content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nullam aliquam placerat mauris risus. Consequat consequat lacus   nulla ut sit. In enim at vel nulla ullamcorper. Tortor justo diam elementum mattis congue in in amet"
    };
    this.images_carousel.push(row1);
    let row2 ={
      "image_santri": "assets/images/image-santri-2.webp",
      "carousel_title":"Program Pendamping",
      "carousel_content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nullam aliquam placerat mauris risus. Consequat consequat lacus nulla ut sit. In enim at vel nulla ullamcorper. Tortor justo diam elementum mattis congue in in amet."
    };
    this.images_carousel.push(row2);
  }
  initialdataQuestion(){
    let row1 ={
      "question_title": "Frequently Ask Question",
      "question_desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ullamcorper egestas imperdiet diam augue. Erat egestas amet, sit felis nisl tristique. Vitae a ultricies risus quam enim vel metus rhoncus, sagittis. In tristique sodales id convallis ac. Rhoncus viverra hendrerit magna bibendum.",    
    };
    this.ask_question.push(row1);
    let row2 ={
      "question_title": "Frequently Ask Question",
      "question_desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ullamcorper egestas imperdiet diam augue. Erat egestas amet, sit felis nisl tristique. Vitae a ultricies risus quam enim vel metus rhoncus, sagittis. In tristique sodales id convallis ac. Rhoncus viverra hendrerit magna bibendum.",    
    };
    this.ask_question.push(row2);
    let row3 ={
      "question_title": "Frequently Ask Question",
      "question_desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ullamcorper egestas imperdiet diam augue. Erat egestas amet, sit felis nisl tristique. Vitae a ultricies risus quam enim vel metus rhoncus, sagittis. In tristique sodales id convallis ac. Rhoncus viverra hendrerit magna bibendum.",    
    };
    this.ask_question.push(row3);
    let row4 ={
      "question_title": "Frequently Ask Question",
      "question_desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ullamcorper egestas imperdiet diam augue. Erat egestas amet, sit felis nisl tristique. Vitae a ultricies risus quam enim vel metus rhoncus, sagittis. In tristique sodales id convallis ac. Rhoncus viverra hendrerit magna bibendum.",    
    };
    this.ask_question.push(row4);
    let row5 ={
      "question_title": "Frequently Ask Question",
      "question_desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ullamcorper egestas imperdiet diam augue. Erat egestas amet, sit felis nisl tristique. Vitae a ultricies risus quam enim vel metus rhoncus, sagittis. In tristique sodales id convallis ac. Rhoncus viverra hendrerit magna bibendum.",    
    };
    this.ask_question.push(row5);
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
      
 
  darkmode()
  {       
    if (this.is_dark_mode=='0')
    {
      /* ionic css document.body.setAttribute('color-theme','dark');    */
      this.is_dark_mode='1';
      let htmlclass= document.querySelector('html').classList ;          
      htmlclass.add("class",'dark');  
    }
    else{
      /* document.body.setAttribute('color-theme','light');  */

      let htmlclass= document.querySelector('html').classList ;          
      htmlclass.remove('dark');       
      this.is_dark_mode='0';
    }
      
  }
  gotToTop()
  {       
    this.content.scrollToTop(1000);
  }
}
