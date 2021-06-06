import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.page.html',
  styleUrls: ['./confirm-page.page.scss'],
})
export class ConfirmPagePage implements OnInit {

  public msg:string;
  constructor(
    public router:ActivatedRoute

  ) { }

  ngOnInit() {
    this.msg= this.router.snapshot.paramMap.get("msg");
    console.log(this.msg);

  }

}
