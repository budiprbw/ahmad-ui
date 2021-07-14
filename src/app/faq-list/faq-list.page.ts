import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.page.html',
  styleUrls: ['./faq-list.page.scss'],
})
export class FaqListPage implements OnInit {
  public shownGroup:null;
  public line_data_lembaga:any=[];
  public ask_question: any = [];
  public error_msg:string="";
  public noFAQ:boolean=false;

  constructor(
    private route: Router,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.initDataLembaga();
    this.toggleGroup(0);
  }
  goBack(){
    this.asp.go_previous_page();
  }
  initDataLembaga(){
    this.asp.get_lembaga().then(
      data=> {        
            this.line_data_lembaga=data;
            if (!this.line_data_lembaga)
            {
              this.error_msg="Tidak ada FAQ !";
              this.noFAQ=true;
            }
          this.initialdataQuestion();
      });
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

}
