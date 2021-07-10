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
    public router:ActivatedRoute,
    private route : Router,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.msg= this.router.snapshot.paramMap.get("msg");
    console.log(this.msg);
  }
  goKeluar(){
    this.route.navigateByUrl('/webdashboard', { replaceUrl:true });
  }

}
