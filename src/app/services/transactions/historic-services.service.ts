import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AccountTransactionModel } from 'src/app/models/AccountTransactionModel';
import { HttpReq } from 'src/app/server/HttpReq';

@Injectable({
  providedIn: 'root'
})

export class HistoricServices {

  constructor(private http: HttpClient, private base_url: HttpReq){}

  getAllCredits(accountId: number): Observable < any > {
    return this.http.get(this.base_url.URL_API() + `credits/${ accountId }` )
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to load users')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  getAllDebits(accountId: number): Observable < any > {
    return this.http.get(this.base_url.URL_API() + `debits/${ accountId }` )
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to load users')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }


}
