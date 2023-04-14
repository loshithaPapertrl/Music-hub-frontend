import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  constructor(public http: HttpClient) { }


  getReviews(userId : any) {
    return this.http.get('http://localhost:8080/user/get_user_vise_review',
        {params:{userId: userId},observe: 'response', withCredentials: true});
  }
  getPersonalReviews() {
    return this.http.get('http://localhost:8080/api/v1/auth/get_personal_review',
        {observe: 'response', withCredentials: true});
  }

    getPosts(userId : any) {
      return this.http.get('http://localhost:8080/user/get_post_by_user_id',
          {params:{userId: userId},observe: 'response', withCredentials: true});
    }

    getPersonalPosts() {
      return this.http.get('http://localhost:8080/api/v1/auth/get_personal_post',
          {observe: 'response', withCredentials: true});
    }

  getPersonalAudioPosts() {
    return this.http.get('http://localhost:8080/api/v1/auth/get_audios_as_post',
        {observe: 'response', withCredentials: true});
  }

  getProfileDetails() {
    return this.http.get('http://localhost:8080/api/v1/auth/get_profile_details',
        {observe: 'response', withCredentials: true});
  }

  getProfileDetailsByVisitor(userId : any) {
    return this.http.get('http://localhost:8080/user/get_profile_details_by_visitor',
        {params:{userId: userId},observe: 'response', withCredentials: true});
  }

    comment(id: any, artistName: any, newComment: any) {

      let requestBody = {
        postId: id,
        comment: newComment,
        commentedBy: artistName
      };
      return this.http.post('http://localhost:8080/api/v1/auth/comment_on_a_post',requestBody,
           {observe: 'response', withCredentials: true});
    }

  saveReview(review: { marks: number; reviewedUserId: any; reviewText: any }) {

    return this.http.post('http://localhost:8080/api/v1/auth/post_review',review,
        {observe: 'response', withCredentials: true});
  }

  getRatingByVisitor(userId : any) {
    return this.http.get('http://localhost:8080/user/get_rating_by_visitor',
        {params:{userId: userId},observe: 'response', withCredentials: true});
  }

  getRatingByOwn() {
    return this.http.get('http://localhost:8080/api/v1/auth/get_rating_by_own',
        {observe: 'response', withCredentials: true});
  }
}
