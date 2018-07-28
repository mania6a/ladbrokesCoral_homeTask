import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  url = 'https://api.soundcloud.com/tracks?client_id=f4094fb8beec3feadb35909471ac9bf5';
  constructor(private http: HttpClient) { }

  search(word) {
    return this.http.get(this.url + '&q=' + word + '&limit=200');
  }
}
