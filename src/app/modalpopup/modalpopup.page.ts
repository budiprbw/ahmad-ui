import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.page.html',
  styleUrls: ['./modalpopup.page.scss'],
})
export class ModalpopupPage implements OnInit {

  constructor(private modalController: ModalController, public route : Router) { }

  ngOnInit() {
  }
  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }
  async goSantriLogin(){
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
    this.route.navigateByUrl('/santrilogin', { replaceUrl:true });

  }
}
