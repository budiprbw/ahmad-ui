import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-jenis-donasi',
  templateUrl: './modal-jenis-donasi.page.html',
  styleUrls: ['./modal-jenis-donasi.page.scss'],
})
export class ModalJenisDonasiPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }
  goModal(jenis_donasi) {
    this.modalController.dismiss(jenis_donasi);
  }

}
