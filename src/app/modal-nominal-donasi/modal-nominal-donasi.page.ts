import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-nominal-donasi',
  templateUrl: './modal-nominal-donasi.page.html',
  styleUrls: ['./modal-nominal-donasi.page.scss'],
})
export class ModalNominalDonasiPage implements OnInit {

  constructor(private modalController: ModalController, public route : Router) { }

  ngOnInit() {
  }
  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }
  goModal(nominal_donasi){
    this.modalController.dismiss(nominal_donasi);    
  }

}
