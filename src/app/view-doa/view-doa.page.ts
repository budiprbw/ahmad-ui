import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';


@Component({
  selector: 'app-view-doa',
  templateUrl: './view-doa.page.html',
  styleUrls: ['./view-doa.page.scss'],
})
export class ViewDoaPage implements OnInit {
  judul_doa: any;
  isi_doa :any;
  public noHadist: any = false;

  constructor(
    public route : ActivatedRoute,
    public router: Router,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.judul_doa = this.router.getCurrentNavigation().extras.state.judul_doa;
        this.isi_doa = this.router.getCurrentNavigation().extras.state.isi_doa;
        this.noHadist=true;
      }
    });
  }
   goBack() {
    this.asp.go_previous_page();
  }
  html_entity(val) {
    return this.asp.html_entity(val);
  }

}
