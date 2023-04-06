import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  constructor(public http: HttpClient) { }


  getReviews(userId : any) {
    return this.http.get('http://localhost:8080/user/get_user_vise_review',
        {params:{userId: 1},observe: 'response', withCredentials: true});
  }
}
