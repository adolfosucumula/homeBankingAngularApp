import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountModel } from 'src/app/models/AccountModel';
import { HttpReq } from 'src/app/server/HttpReq';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountServicesService {

  constructor(private http: HttpClient, private baseUrl: HttpReq  ) { }

  getAll(){
    return this.http.get < AccountModel [] >  ( this.baseUrl.URL_API() + 'accounts/' );
  }

  create(
    account: number,
    iban: string,
    swift: string,
    owner: string,
    ownerDoc: string,
    initialBalance: string,
    currentBalance: string,
    currency: string,
    createdAt: string,
    isActive: boolean): Observable <any>{

    return this.http.post < AccountModel > (this.baseUrl.URL_API() + 'accounts', {
      account,
      iban,
      swift,
      owner,
      ownerDoc,
      initialBalance,
      currentBalance,
      currency,
      createdAt,
      isActive
    })
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to create an account')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  getById(id: number){
    return this.http.get < AccountModel > ( this.baseUrl.URL_API() + `accounts/${ id }` )
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to get account by id')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  getByAccount(account: string): Observable<any> {
    return this.http.get < AccountModel > ( this.baseUrl.URL_API() + `accounts/${ account }` )
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to get data by account')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }


  update(id: number,
    account: number,
    iban: string,
    swift: string,
    owner: string,
    ownerDoc: string,
    initialBalance: string,
    currentBalance: string,
    currency: string,
    createdAt: string,
    isActive: boolean): Observable <any>{
    return this.http.put < AccountModel > ( this.baseUrl.URL_API() + `accounts/${ id }`, {
      account,
      iban,
      swift,
      owner,
      ownerDoc,
      initialBalance,
      currentBalance,
      currency,
      createdAt,
      isActive
    } )
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to update account')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  updateBalance(id: number,
    account: string,
    iban: string,
    swift: string,
    owner: string,
    ownerDoc: string,
    initialBalance: string,
    currentBalance: string,
    currency: string,
    createdAt: string,
    updatedAt: string,
    isActive: boolean
    ): Observable <any>{
    return this.http.put < AccountModel > ( this.baseUrl.URL_API() + `accounts/${ id }`, {
      account,
      iban,
      swift,
      owner,
      ownerDoc,
      initialBalance,
      currentBalance,
      currency,
      createdAt,
      updatedAt,
      isActive
    } )
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to update account balance')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  delete(id: number){
    return this.http.delete < AccountModel > ( this.baseUrl.URL_API() + `accounts/${ id }` )
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to delete account')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

}
