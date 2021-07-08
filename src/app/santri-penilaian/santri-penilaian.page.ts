import { Component, OnInit } from '@angular/core';
import { AhmadproviderService } from '../ahmadprovider.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-santri-penilaian',
  templateUrl: './santri-penilaian.page.html',
  styleUrls: ['./santri-penilaian.page.scss'],
})
export class SantriPenilaianPage implements OnInit {
 public materilist:any;
 public bimbingan:any;
 public santri_id:any;
 public pembimbing_id:any;
 public error_msg:string="";
 public noProgram:boolean=false; 
 public materi_id:any;
 public bimbingan_materi_angka:number;
 public bimbingan_materi_huruf:string;
 public bimbingan_materi_catatan:string;

  constructor(
    public asp: AhmadproviderService,
    private route: Router,
    private router:ActivatedRoute
  ) { }

  ngOnInit() {
    this.getBimbinganProgress();    
    this.getMateri();
  }
  async getBimbinganProgress(){
    this.santri_id= this.router.snapshot.paramMap.get("santri_id");
    this.pembimbing_id= this.router.snapshot.paramMap.get("pembimbing_id");
    await this.asp.santri_bimbingan_progress(this.santri_id).then(
      data => {
        this.bimbingan = data;
        if (this.bimbingan.status=="error")
        {
            this.noProgram=false;
        }
        else
        {
          this.noProgram=true;
        }
      });
  }
  async getMateri(){
    await this.asp.getlist_materi().then(
      data => {
        this.materilist = data;
      });
  }

  goSavePenilaian(){
    this.asp.santri_bimbingan_penilaian(this.santri_id,this.pembimbing_id,this.materi_id,this.bimbingan_materi_angka, this.bimbingan_materi_huruf, this.bimbingan_materi_catatan).then(
      data => {
        let result:any= data;
        if (result.data.status=="error")
        {
            this.error_msg=result.data.message;
        }
        else
        {
          this.asp.presentToast("Penilaian sudah disimpan");          
        }
      });
  }
  goBack(){
    this.asp.go_previous_page();
  }

}
