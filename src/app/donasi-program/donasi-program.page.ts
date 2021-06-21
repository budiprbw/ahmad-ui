import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-donasi-program',
  templateUrl: './donasi-program.page.html',
  styleUrls: ['./donasi-program.page.scss'],
})
export class DonasiProgramPage implements OnInit {
 public videourl:string="https://www.youtube.com/watch?v=SPmI5oP_pM8";
  constructor(
    private router: ActivatedRoute,
    private route : Router,
    public asp: AhmadproviderService,
    private  sanitizer:DomSanitizer

  ) { }

  ngOnInit() {
  }
  goBack(){
    this.route.navigateByUrl('/registrasi-akun', { replaceUrl:true });
  }

}
