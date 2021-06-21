import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-donasi-list',
  templateUrl: './donasi-list.page.html',
  styleUrls: ['./donasi-list.page.scss'],
})
export class DonasiListPage implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private route : Router,
    public asp: AhmadproviderService

  ) { }

  ngOnInit() {
  }

}
