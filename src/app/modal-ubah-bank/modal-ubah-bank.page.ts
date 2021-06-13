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

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.initialBankList();
  }
  initialBankList(){
    let row1 ={      
      "nama_bank":"BANK BSI",
      "no_rekening": "00000-090000-00001",
      "atas_nama": "Bagus Baskara",    
      "is_selected":'0',
    };
    this.banklist.push(row1);
    let row2 ={
      "nama_bank":"BANK Mandiri",
      "no_rekening": "00000-090000-00002",
      "atas_nama": "Bagus Lesmana",    
      "is_selected":'0',
    };
    this.banklist.push(row2);
    let row3 ={
      "nama_bank":"BANK BCA",
      "no_rekening": "00000-090000-00003",
      "atas_nama": "Bagus Prasetia",    
      "is_selected":'0',
    };
    this.banklist.push(row3);
    let row4 ={
      "nama_bank":"BANK BNI",
      "no_rekening": "00000-090000-00004",
      "atas_nama": "Bagus Dramawan",    
      "is_selected":'0',
    };
    this.banklist.push(row4);
    let row5 ={
      "nama_bank":"BANK BRI",
      "no_rekening": "00000-090000-00005",
      "atas_nama": "Bagus Prahara",    
      "is_selected":'0',
    };
    this.banklist.push(row5);
  }
  public radioGroupChange(e){ 
    let no_rekening_selected=e.detail.value;
    this.bankListSelected=[];
    for(let i =0; i <= this.banklist.length-1; i++) {
      if (this.banklist[i].no_rekening == no_rekening_selected)
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
