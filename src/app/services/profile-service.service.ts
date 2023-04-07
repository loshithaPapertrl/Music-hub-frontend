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

    getPosts(userId : any) {
      return this.http.get('http://localhost:8080/user/get_post_by_user_id',
          {params:{userId: userId},observe: 'response', withCredentials: true});
    }

  getProfileDetails(userId : any) {
    return this.http.get('http://localhost:8080/user/get_profile_details',
        {params:{userId: userId},observe: 'response', withCredentials: true});
  }
}
