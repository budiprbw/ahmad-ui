import { Component, OnInit } from '@angular/core';
declare var loadExternalJs;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
  ngAfterViewInit(){
    loadExternalJs();
  }

}
