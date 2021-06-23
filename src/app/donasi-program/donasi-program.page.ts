import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser'

@Component({
  selector: 'app-donasi-program',
  templateUrl: './donasi-program.page.html',
  styleUrls: ['./donasi-program.page.scss'],
})
export class DonasiProgramPage implements OnInit {
  public vidurl: string = "https://www.youtube.com/embed/e-KygsbNVGk";
  public  urlSafe: SafeResourceUrl;

  constructor(
    private router: ActivatedRoute,
    private route : Router,
    public asp: AhmadproviderService,
    public domSanitizer: DomSanitizer

  ) { }

  ngOnInit() {
    this.urlSafe =this.domSanitizer.bypassSecurityTrustResourceUrl(this.vidurl);

  }
  goBack(){
    this.route.navigateByUrl('/registrasi-akun', { replaceUrl:true });
  }

}
