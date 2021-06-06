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
  public shownGroup:null;
  public is_dark_mode:any =false;
  constructor( ) { }


  ngOnInit() {
    this.initialdataQuestion();
    this.toggleGroup(0);
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
    if (!this.is_dark_mode)
    {
      document.body.setAttribute('color-theme','dark');    
      this.is_dark_mode=true;
    }
    else{
      document.body.setAttribute('color-theme','light');   
      this.is_dark_mode=false;
    }
      
  }
  gotToTop()
  {       
    this.content.scrollToTop(1000);
  }
}
