import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(public http: HttpClient) { }


  getUsersCategoryVise(categoryId : any) {
    return this.http.get('http://localhost:8080/user/get_users_category_vise',
        {params:{categoryId: categoryId},observe: 'response', withCredentials: true});
  }
}
