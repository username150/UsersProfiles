import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  posts: Subject<any> = new BehaviorSubject(undefined);
  constructor() {}
}