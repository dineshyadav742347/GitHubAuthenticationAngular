import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class DashboardService {

  constructor(private http: Http) { }

  getUserProfile()
  {
  	 return this.http.get('/profile').map( response =>
      response.json(),
      (error:any)=>{
      error.json();
    });

  }

}
