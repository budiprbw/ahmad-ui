import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.page.html',
  styleUrls: ['./confirm-page.page.scss'],
})
export class ConfirmPagePage implements OnInit {

  public msg:string;
  constructor(
    public route:ActivatedRoute,
    private router : Router,
    public asp: AhmadproviderService
  ) { }
r
  ngOnInit() {
    // this.msg= this.route.snapshot.paramMap.get("msg");
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.msg = this.router.getCurrentNavigation().extras.state.msg;
      }
    });
    
  }
  goKeluar(){
    this.asp.go_page_home();
  }

}
