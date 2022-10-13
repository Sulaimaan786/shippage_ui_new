import { Injectable } from '@angular/core';
import {Observable,BehaviorSubject,Subject } from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { User } from "src/app/core/models/user";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private name = new BehaviorSubject<string>('');
  private subjectName = new Subject<any>();
  public userRefId:string;
  constructor(private httpClient: HttpClient) { }
  
  sendUpdate(message: string) { //the component that wants to update something, calls this fn
    this.subjectName.next({ text: message }); //next() will feed the value in Subject
}

  getUpdate(): Observable<any> { //the receiver component calls this function 
      return this.subjectName.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }

  SetName(name: string) {
    this.name.next(name);
  }

  SetUserRefId(userRefId: string){
    this.userRefId = userRefId;
  }
}
