import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http: HttpClient) { }

  getAllUsers() {
    return this.http.get('http://localhost:8080/api/v1/auth/get_all_users',
        {observe: 'response', withCredentials: true});
  }

  addNote(note: any) {
    let requestBody = {
      note: note
    };
    return this.http.post('http://localhost:8080/api/v1/auth/add_admin_note',requestBody,
        {observe: 'response', withCredentials: true});
  }

  getAllNote() {
    return this.http.get('http://localhost:8080/api/v1/auth/get_admin_note',
        {observe: 'response', withCredentials: true});
  }

  deleteNote(noteId:any){
    return this.http.delete('http://localhost:8080/api/v1/auth/delete_note',
        {params:{noteId: noteId},observe: 'response', withCredentials: true});
  }

  updateUserStatus(id:any,isActive:any){

    let requestBody = {
      id: id,
      isActive:isActive
    };
    return this.http.put('http://localhost:8080/api/v1/auth/update_user_status',requestBody,
        {observe: 'response', withCredentials: true});
  }

}
