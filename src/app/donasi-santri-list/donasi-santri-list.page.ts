import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import { AhmadproviderService } from '../ahmadprovider.service';
// import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-donasi-santri-list',
  templateUrl: './donasi-santri-list.page.html',
  styleUrls: ['./donasi-santri-list.page.scss'],
})
export class DonasiSantriListPage implements OnInit {
  public santrilist: any = [];
  public donasi_id:any;
  public pendamping_id:any;
  public total_santri:any=0;
  public error_msg:string="";
  public donatur_id:any;
  public usrinfo:any;
  public santri_list_title:string=""
 
  constructor(
    public asp: AhmadproviderService,
    public route: Router,
    public router: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.usrinfo =  this.asp.getUserInfo();
    
    this.getListSantriByDonatur();    
  }
  getListSantriByDonatur(){
    if (this.usrinfo.login_mode=="donatur")
    {
      this.santri_list_title="Total Santri Penerima Donasi"
      this.donatur_id= this.usrinfo.ref_object.id;
        this.asp.bimbingan_list_santri_bydonaturid(this.donatur_id).then(
          data=> {        
                let result:any;
                result =data;                         
                if (result.data.length > 0)
                {
                      for(let i =0; i <= result.data.length-1; i++) {
                        let santri_lokasi_photo="assets/images/no-image.png";
                        if ( result.data[i].santri.santri_lokasi_photo!=null) santri_lokasi_photo= result.data[i].santri.santri_lokasi_photo;
                        let row1 = {
                          "santri_id": result.data[i].santri.id,
                          "photo_url":  santri_lokasi_photo,
                          "nama_santri": result.data[i].santri.santri_nama,
                          "nama_prgram": result.data[i].bimbingan_predikat,
                          "pencapaian": result.data[i].bimbingan_progress
                        };
                        this.santrilist.push(row1);
                      }
                      this.total_santri= this.santrilist.length;
                      
                } 
          });
      }
      if (this.usrinfo.login_mode=="pendamping")
      {
        this.santri_list_title="Total Santri dalam monitoring";
        this.pendamping_id= this.usrinfo.ref_object.id;
        this.asp.santri_by_pendampingId(this.pendamping_id).then(
          data => {
            let result: any;
            result = data;
            if (result[0].santri.length > 0) {
              for(let i =0; i <= result[0].santri.length-1; i++) {
                let santri_lokasi_photo="assets/images/no-image.png";
                if ( result[0].santri[i].santri_lokasi_photo!=null) santri_lokasi_photo= result[0].santri[i].santri_lokasi_photo;
                let row1 = {
                  "santri_id": result[0].santri[i].id,
                  "photo_url":  santri_lokasi_photo,
                  "nama_santri": result[0].santri[i].santri_nama,
                  "nama_prgram": 0,
                  "pencapaian": 0
                };
                this.santrilist.push(row1);
              }
              this.total_santri= this.santrilist.length;
            }            
          });
      }

  }
  
  initialSantriList(){
    this.donasi_id= this.router.snapshot.paramMap.get("donasi_id");
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
    let navigationExtras: NavigationExtras = {
      state: {
        santri: item
      }
    };
    this.route.navigate(['detail-penerima-donasi'], navigationExtras);
    // this.route.navigate(['detail-penerima-donasi', { santri_id: item.santri_id,nama_santri:item.nama_santri }]);

  }
}
