import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountModel } from 'src/app/models/AccountModel';
import { ApiUrl } from 'src/app/server/ApiUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountServicesService {

  constructor(private http: HttpClient, private baseUrl: ApiUrl  ) { }

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
      currency,
      createdAt,
      isActive
    });
  }

  getById(id: number){
    return this.http.get < AccountModel > ( this.baseUrl.URL_API() + `accounts/${ id }` );
  }

  getByAccount(account: number){
    return this.http.get < AccountModel > ( this.baseUrl.URL_API() + `accounts/${ account }` );
  }


  update(id: number,
    account: number,
    iban: string,
    swift: string,
    owner: string,
    ownerDoc: string,
    initialBalance: string,
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
      currency,
      createdAt,
      isActive
    } );
  }

  delete(id: number){
    return this.http.delete < AccountModel > ( this.baseUrl.URL_API() + `accounts/${ id }` )
  }

}
