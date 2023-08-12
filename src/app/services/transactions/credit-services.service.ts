import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountTransactionModel } from 'src/app/models/AccountTransactionModel';
import { HttpReq } from 'src/app/server/HttpReq';
@Injectable({
  providedIn: 'root'
})
export class CreditServicesService {

  constructor(private http: HttpClient, private base_url: HttpReq) { }

  getAll(){
    return this.http.get < AccountTransactionModel [] > ( this.base_url.URL_API() + 'credits/');
  }

  create(
    sourceAccount: string,
    owner: string,
    account: string,
    balanceBefore: string,
    amount: string,
    balanceAfter: string,
    operator: string,
    status: string,
    createdAt: string
  ): Observable <any>{
    return this.http.post < AccountTransactionModel > ( this.base_url.URL_API() + 'credits', {
      sourceAccount,
      owner,
      account,
      balanceBefore,
      amount,
      balanceAfter,
      operator,
      status,
      createdAt
    } );
  }

  getById(id: number) {
    return this.http.get < AccountTransactionModel > ( this.base_url.URL_API() + `credits/${ id }`);
  }

  getByAccount(account: number) {
    return this.http.get < AccountTransactionModel > ( this.base_url.URL_API() + `credits/${ account }`);
  }

}
