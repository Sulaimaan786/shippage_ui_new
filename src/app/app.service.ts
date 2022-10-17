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
  private userLoggedIn = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { 
    this.userLoggedIn.next(false);
  }
  
  
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

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }
}
