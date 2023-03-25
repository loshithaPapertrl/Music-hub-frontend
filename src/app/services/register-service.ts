import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class RegisterService {

    constructor(public http: HttpClient) {

    }

    /**
        * Register User
        * @param user object
        */
    registerUser(userDto) {
        return this.http.post('http://localhost:8080/user/register',
            userDto, {observe: 'response', withCredentials: true});
    }
}
