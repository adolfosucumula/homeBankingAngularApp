import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountClass } from 'src/app/models/AccountModel';
import { HttpReq } from 'src/app/server/HttpReq';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { handleError } from 'src/app/utils/handle-error';
import { GenericServices } from '../generic-services.service';

let model: AccountClass = new AccountClass();

@Injectable({
  providedIn: 'root'
})
export class AccountServicesService {

  constructor(private http: HttpClient, private baseUrl: HttpReq, private services: GenericServices  ) { }

  getAll(){

     //account.tableName = "accounts"
     model.setTableName("accounts")

     //return this.http.get < AccountModel [] >  ( this.endPoint.URL() + 'accounts/' )
     return this.services.read(model)
     .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError(handleError) // then handle the error
    );
  }

  create(
    account: number,
    iban: string,
    swift: string,
    owner: string,
    ownerDoc: number,
    initialBalance: string,
    currentBalance: string,
    currency: string,
    createdAt: string,
    isActive: boolean): Observable <any>{
    model.account = account.toString();
    model.iban = iban;
    model.swift = swift;
    model.owner = owner;
    model.ownerDoc = ownerDoc.toString();
    model.initialBalance = initialBalance;
    model.currentBalance = currentBalance;
    model.currency = currency;
    model.createdAt = createdAt;
    model.isActive = isActive;

    model.setTableName("accounts")
    return this.services.create(model, model)
    /*return this.http.post < AccountClass > (this.baseUrl.URL_API() + 'accounts', {
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
    })*/
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      retry(3), // retry a failed request up to 3 times
      catchError(handleError) // then handle the error
    );
  }

  getById(id: number){
    return this.http.get < AccountClass > ( this.baseUrl.URL_API() + `accounts/${ id }` )
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      retry(3), // retry a failed request up to 3 times
      catchError(handleError) // then handle the error
    );
  }

  getByAccount(account: string): Observable<any> {
    return this.http.get < AccountClass > ( this.baseUrl.URL_API() + `accounts/${ account }` )
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


  update(id: number,
    account: number,
    iban: string,
    swift: string,
    owner: string,
    ownerDoc: number,
    initialBalance: string,
    currentBalance: string,
    currency: string,
    createdAt: string,
    isActive: boolean): Observable <any>{
    return this.http.put < AccountClass > ( this.baseUrl.URL_API() + `accounts/${ id }`, {
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
        console.log('error caught in service. When trying to load users')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  updateBalance(id: number,
    account: number,
    iban: string,
    swift: string,
    owner: string,
    ownerDoc: number,
    initialBalance: string,
    currentBalance: string,
    currency: string,
    createdAt: string,
    updatedAt: string,
    isActive: boolean
    ): Observable <any>{
    return this.http.put < AccountClass > ( this.baseUrl.URL_API() + `accounts/${ id }`, {
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
    } ).pipe(
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

  delete(id: number){
    return this.http.delete < AccountClass > ( this.baseUrl.URL_API() + `accounts/${ id }` )
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


   /**
   *
   * @param dataList is the data list got from the database list
   * @param item is the account number to be found of
   * @returns
   */
   findByAccountInDBList(dataList: AccountClass[] | any, item: string | number | any): Observable <any> {
    return dataList.find( (dataList: { account: string }) => dataList.account == item);
  }

  /**
   *
   * @param dataList is the data list got from the database list
   * @param item the iban reference to be found of
   * @returns
   */
  findByIbanInDBList(dataList: AccountClass[] | any, item: string | number | any): Observable <any> {
    return dataList.find( (dataList: { iban: string }) => dataList.iban == item);
  }

  /**
   *
   * @param dataList is the data list got from the database list
   * @param item is the owner document to be found by
   * @returns
   */
  findByOwnerDocInDBList(dataList: AccountClass[] | any, item: string | number | any): Observable <any> {
    return dataList.find( (dataList: { ownerDoc: string }) => dataList.ownerDoc == item);
  }



}
