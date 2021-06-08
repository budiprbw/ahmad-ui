import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-detail-berita',
  templateUrl: './detail-berita.page.html',
  styleUrls: ['./detail-berita.page.scss'],
})
export class DetailBeritaPage implements OnInit {
  berita_id :string;
  berita :any;
  constructor(
    public route : ActivatedRoute,
    public router: Router,
    public asp: AhmadproviderService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.berita = this.router.getCurrentNavigation().extras.state.berita;
        console.log(this.berita);
      }
    });
  }
  goBack() {
    this.asp.go_previous_page();
  }

}
