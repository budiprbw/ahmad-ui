import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-cara-pilih-santri',
  templateUrl: './modal-cara-pilih-santri.page.html',
  styleUrls: ['./modal-cara-pilih-santri.page.scss'],
})
export class ModalCaraPilihSantriPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }
  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }
  goModal(pilih_santri){
    this.modalController.dismiss(pilih_santri);    
  }

}
