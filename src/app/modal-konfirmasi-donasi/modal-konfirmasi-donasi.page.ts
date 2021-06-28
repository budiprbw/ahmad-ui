import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-konfirmasi-donasi',
  templateUrl: './modal-konfirmasi-donasi.page.html',
  styleUrls: ['./modal-konfirmasi-donasi.page.scss'],
})
export class ModalKonfirmasiDonasiPage implements OnInit {

  constructor(private modalController: ModalController, public route : Router) { }

  ngOnInit() {
  }
  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }
  async goDonasiProgram(){
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
    this.route.navigateByUrl('/donasi-program', { replaceUrl:true });

  }

}
