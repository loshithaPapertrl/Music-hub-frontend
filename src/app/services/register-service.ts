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

    saveProfile(profileDto) {

        const formData = new FormData();
        formData.append('profilePicture', profileDto.profilePicture);
        formData.append('profession', profileDto.profession);
        formData.append('genres', profileDto.genres);
        formData.append('moods', profileDto.moods);
        formData.append('about', profileDto.about);
        formData.append('youtubeLink', profileDto.youtubeLink);
        formData.append('spotifyLink', profileDto.spotifyLink);

        return this.http.post('http://localhost:8080/api/v1/auth/add_profile_details',
            formData, {observe: 'response', withCredentials: true});
    }
}
