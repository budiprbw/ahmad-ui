import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';


@Component({
  selector: 'app-pengingat-donasi',
  templateUrl: './pengingat-donasi.page.html',
  styleUrls: ['./pengingat-donasi.page.scss'],
})
export class PengingatDonasiPage implements OnInit {

  constructor(
    public route : ActivatedRoute,
    public router: Router,
    public asp: AhmadproviderService,
  ) { }

  ngOnInit() {
  }
  goRiwayatDonasi(){
    this.router.navigateByUrl('/donasi-riwayat', { replaceUrl:true });
  }

}
