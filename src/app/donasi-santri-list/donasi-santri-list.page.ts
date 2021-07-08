import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';

@Component({
  selector: 'app-donasi-santri-list',
  templateUrl: './donasi-santri-list.page.html',
  styleUrls: ['./donasi-santri-list.page.scss'],
})
export class DonasiSantriListPage implements OnInit {
  public santrilist: any = [];
  public donasi_id:any;
  public total_santri:any=0;
  public error_msg:string="";
  constructor(
    public asp: AhmadproviderService,
    public route: Router,
    public router: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.donasi_id= this.router.snapshot.paramMap.get("donasi_id");
    this.initialSantriList();
  }
  
  initialSantriList(){
    this.asp.list_santri_by_donasiid(this.donasi_id).then(
      data=> {        
            let result:any;
            result =data;            
            this.total_santri=result.data[0].santri.length;
            if (result.data[0].santri.length === 0)
            {
              this.error_msg = "tidak ada data ";
            }
            else
            {
                  for(let i =0; i <= result.data[0].santri.length-1; i++) {
                    let row1 = {
                      "santri_id": result.data[0].santri[i].id,
                      "photo_url": "assets/images/no-image.png",
                      "nama_santri": result.data[0].santri[i].santri_nama,
                      "nama_prgram": "Progress Pembelajaran",
                      "pencapaian": "40%",
                    };
                    this.santrilist.push(row1);
                  }
             } 
      });

      
  }
  goBack(){
    //this.route.navigateByUrl('/dashboard-donatur/tabhome', { replaceUrl: true });
    this.asp.go_previous_page();
  }
  goDetailPenerima(item){
    this.route.navigate(['detail-penerima-donasi', { santri_id: item.santri_id,nama_santri:item.nama_santri }]);

  }
}
