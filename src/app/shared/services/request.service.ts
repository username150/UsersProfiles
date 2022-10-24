import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Posts } from '../models/posts';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  loader: Subject<boolean> = new BehaviorSubject(false);
  constructor(private http: HttpClient) { }

  getConfigResponse(url: string): Observable<User | Posts> {
    return this.http.get<User | Posts>(url);
  }
}
