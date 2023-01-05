import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor(private http: HttpClient) { }

    sendMessage(message: string, id: string): Observable<any> {
        return this.http.post(`http://localhost:3000/message/${id}`,{message})
    }
}
