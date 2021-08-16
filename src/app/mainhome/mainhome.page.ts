import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AhmadproviderService } from '../ahmadprovider.service';
import { SocialShareComponent } from '../components/social-share/social-share.component';

declare var loadExternalJs;

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.page.html',
  styleUrls: ['./mainhome.page.scss'],
})
export class MainhomePage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  backToTop: string = '-1';
  public line_data_lembaga: any = [];
  public ask_question: any = [];
  public shownGroup: null;
  public is_dark_mode: string = '0';
  public no_data_lembaga: boolean = false;

  constructor(
    private platform: Platform,
    public modalCtrl: ModalController,
    public asp: AhmadproviderService,
  ) { }

  ngOnInit() {
    this.asp.clearLocalstorage();
    this.initDataLembaga();
    this.toggleGroup(0);
  }
  ngAfterViewInit() {
    loadExternalJs();
  }
  async initDataLembaga() {
    await this.asp.get_lembaga().then(
      data => {
        this.line_data_lembaga = data;
        if (this.line_data_lembaga) this.no_data_lembaga = true;
        this.initialdataQuestion();
      });
  }
  initialdataQuestion() {
    this.ask_question = this.line_data_lembaga.faq;
    console.log(this.ask_question);
  }
  html_entity(val) {
    return this.asp.html_entity(val);
  }


  async showShareOptions(mode) {
    let wsurl = '';
    if (mode == 'donatur') {
      wsurl = 'donasi-program';
    }
    if (mode == 'santri') {
      wsurl = 'program-santri';
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
    else {
      this.asp.shareLink(wsurl);
    }
  }
  async shareLink(mode) {
    let wsurl = '';
    if (mode == 'donatur') {
      wsurl = 'donasi-program';
    }
    if (mode == 'santri') {
      wsurl = 'program-santri';
    }
    this.asp.shareLink(wsurl);
  }

  getScrollPos(event: any) {
    const pos = event.detail.scrollTop;
    //console.log(pos);
    //this.platform.height()
    if (this.platform.is('desktop')) {
      if (pos > 1115) {
        this.backToTop = '1';
      }
      else {
        this.backToTop = '-1';
      }
    }
    else {
      if (pos > 94) {
        this.backToTop = '1';
      }
      else {
        this.backToTop = '-1';
      }
    }


  }
  setNavBarClass() {
    if (this.backToTop == '1') {
      return 'navbar classic transparent navbar-expand-lg navbar-light banner--clone fixed banner--stick';

    }
    if (this.backToTop == '0') {
      return 'navbar classic transparent navbar-expand-lg navbar-light banner--clone fixed banner--unstick';
    }
    if (this.backToTop == '-1') {
      return 'navbar classic transparent navbar-expand-lg navbar-light ';
    }
  }
  setClassProgress() {
    if (this.backToTop == '1') {
      return 'active-progress';
    }
    if (this.backToTop == '0') {
      return '';
    }
  }
  gotToTop() {
    this.content.scrollToTop(1500);
  }
  scroll(hashtag) {
    var anchor = document.getElementById(hashtag);
    anchor.scrollIntoView({ block: "start", behavior: "smooth" });
  }
  getTarget(i) {
    return '#colapse' + i;
  }
  getId(i) {
    return 'colapse' + i;
  }
  getheading(i) {
    return 'heading' + i;
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
  classGroupShown(group) {
    if (this.shownGroup === group) {
      return "accordion-collapse collapse  show";
    }
    return "accordion-collapse collapse";
  };
  classButton(group) {
    if (this.shownGroup === group) {
      return "accordion-button";
    }
    return "accordion-button collapsed";
  }
  isExpand(group){
    if (this.shownGroup === group) {
      return "true";
    }
    return "false";

  }



}
