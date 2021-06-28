import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal-ubah-bank',
  templateUrl: './modal-ubah-bank.page.html',
  styleUrls: ['./modal-ubah-bank.page.scss'],
})
export class ModalUbahBankPage implements OnInit {
  public banklist:any=[];
  public bankListSelected:any=[];

  constructor(private modalController: ModalController,private asp:AhmadproviderService) { }

  ngOnInit() {
    this.initialBankList();
  }
  initialBankList(){
    this.asp.getlist_rekening_lembaga().then(
      data=> {        
        this.banklist=data;
      });        
  }
  public radioGroupChange(e){ 
    let no_rekening_selected=e.detail.value;
    this.bankListSelected=[];
    for(let i =0; i <= this.banklist.length-1; i++) {
      if (this.banklist[i].rekening_no == no_rekening_selected)
      {
        this.banklist[i].is_selected='1';
        this.bankListSelected.push(this.banklist[i]);
        this.modalController.dismiss( this.bankListSelected);  
      }
      else{
        this.banklist[i].is_selected='0';
      }
    }
  }

}
