import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';

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
    public router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.berita = this.router.getCurrentNavigation().extras.state.berita;
        console.log(this.berita);
      }
    });

  }

}
