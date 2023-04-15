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
        formData.append('talentCategory', profileDto.talentCategory);

        return this.http.post('http://localhost:8080/api/v1/auth/add_profile_details',
            formData, {observe: 'response', withCredentials: true});

    }

    updateProfile(profileDto) {

        const formData = new FormData();

        if (!!profileDto.profilePicture){
            formData.append('profilePicture', profileDto.profilePicture);
        }
        formData.append('profession', profileDto.profession);
        formData.append('genres', profileDto.genres);
        formData.append('moods', profileDto.moods);
        formData.append('about', profileDto.about);
        formData.append('youtubeLink', profileDto.youtubeLink);
        formData.append('spotifyLink', profileDto.spotifyLink);
        formData.append('talentCategory', profileDto.talentCategory);

        return this.http.put('http://localhost:8080/api/v1/auth/update_profile_details',
            formData, {observe: 'response', withCredentials: true});

    }



    getCategories() {

        return this.http.get('http://localhost:8080/user/getAllTalentCategories',
            {observe: 'response', withCredentials: true});
    }

    savePost(postDto){
        const formData1 = new FormData();
        formData1.append('postType', postDto.postType);
        formData1.append('postContent', postDto.postContent);
        formData1.append('about', postDto.about);

        return this.http.post('http://localhost:8080/api/v1/auth/save_talents_as_a_post',
            formData1, {observe: 'response', withCredentials: true});
    }
}
