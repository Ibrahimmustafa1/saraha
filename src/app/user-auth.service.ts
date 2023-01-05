import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  isAuth: BehaviorSubject<any> = new BehaviorSubject(false)
  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('user')) {
      this.isAuth.next(true);

    }
    else { this.isAuth.next(false); }
  }
  login(form: FormGroup): Observable<any> {
    return this.http.post('http://localhost:3000/user/login', form)
  }
  register(form: FormGroup): Observable<any> {
    return this.http.post('http://localhost:3000/user/signup', form)
  }
  getUserMessage(): Observable<any> {
    let headers = new HttpHeaders({
      token: `${localStorage.getItem('user')}`
    });
    return this.http.get('http://localhost:3000/message', { headers: headers })
  }
  updateProfileImg(img: any) {
    let Formdata = new FormData();
    Formdata.append('profileImg', img);
    let headers = new HttpHeaders({
      token: `${localStorage.getItem('user')}`
    });
    return this.http.put('http://localhost:3000/user/editprofile', Formdata ,{headers: headers })
  }
  getUserProfileData():any{
    let headers = new HttpHeaders({
      token: `${localStorage.getItem('user')}`
    });
    return this.http.get('http://localhost:3000/user/profile',{
      headers: headers
    })
  }
  updateUserProfile(data:any){

    let Formdata = new FormData();

    Formdata.append('profileImg',data.profileImg)
    Formdata.append('firstName',data.firstName)
    Formdata.append('lastName',data.lastName)
    Formdata.append('email',data.email)
    let headers = new HttpHeaders({
      token: `${localStorage.getItem('user')}`
    });
    return this.http.put('http://localhost:3000/user/editprofile', Formdata ,{headers: headers })
  }
  userMetaData(id: string):any{
    return this.http.get(`http://localhost:3000/user/metaData/${id}`)
  }
}
