import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountModel } from 'src/app/models/AccountModel';
import { HttpReq } from 'src/app/server/HttpReq';
import { Observable } from 'rxjs';

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
    });
  }

  getById(id: number){
    return this.http.get < AccountModel > ( this.baseUrl.URL_API() + `accounts/${ id }` );
  }

  getByAccount(account: string): Observable<any> {
    return this.http.get < AccountModel > ( this.baseUrl.URL_API() + `accounts/${ account }` )
    ;
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
    } );
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
    } );
  }

  delete(id: number){
    return this.http.delete < AccountModel > ( this.baseUrl.URL_API() + `accounts/${ id }` )
  }

}
