import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from '../auth/http-service.service';
import { serverLocations } from '../auth/serverLocations';
import { Quote } from './request-quote-model';

@Injectable({
  providedIn: 'root'
})
export class RequestQuoteService {
  isTblLoading = true;
  dataChange: BehaviorSubject<Quote[]> = new BehaviorSubject<Quote[]>(
    []
  );
  dialogData: Quote;
  constructor(  private serverUrl: serverLocations,private httpService: HttpServiceService) { }
  private saveQuote = `${this.serverUrl.apiServerAddress}api/auth/app/quote/seaSave`;
  get data(): Quote[] {
    return this.dataChange.value;
  }
  addQuote(Quote: Quote): void {
    this.dialogData = Quote;
    this.httpService.post<Quote>(this.saveQuote, Quote).subscribe(data => {
      console.log(data);
      // if(data.Success=true){
      //  showNotification(
      //     "snackbar-success",
      //     "Add Record Successfully...!!!",
      //     "bottom",
      //     "center"
      //  );
        // router.navigate(['/master/currencyMaster/listCurrency']);
     // }
      // else if(data.Success=false){
      // showNotification(
      //     "snackbar-danger",
      //     "Not Updated Successfully...!!!",
      //     "bottom",
      //     "center"
      //   );
      // }
      },
      (err: HttpErrorResponse) => {
        
    });
  }
}
