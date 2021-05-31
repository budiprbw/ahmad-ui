import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AhmadproviderService {
  readonly baseAPIUrl: string = 'http://127.0.0.1:8000/api/' //'http://kidswa.web.id/ahmad/core-devel/public/api/';
  private api_register_donatur= this.baseAPIUrl + 'donatur/register';
  

  constructor(public httpclient: HttpClient) { }
  regiaster_donatur(user_email,user_password){
      let data ={
                  "user_email": user_email,
                  "user_password": user_password
                };
                let httpOptions = {
                  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
                };  
                return new Promise(resolve => {
                  this.httpclient.post(this.api_register_donatur ,data,httpOptions).subscribe(data => {
                    resolve(data);
                  }, err => {
                    console.log(err);
                  });
                });
  }
}
