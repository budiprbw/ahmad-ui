import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-ajak-gabung',
  templateUrl: './ajak-gabung.page.html',
  styleUrls: ['./ajak-gabung.page.scss'],
})
export class AjakGabungPage implements OnInit {

  constructor(private asp:AhmadproviderService) { }

  ngOnInit() {
  }
  goBack(){
    this.asp.go_previous_page();
  }
  goAjak(){
    
  }

}
