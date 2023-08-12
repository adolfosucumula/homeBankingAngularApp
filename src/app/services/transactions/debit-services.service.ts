import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountTransactionModel } from 'src/app/models/AccountTransactionModel';
import { HttpReq } from 'src/app/server/HttpReq';

@Injectable({
  providedIn: 'root'
})
export class DebitServicesService {
  constructor(private http: HttpClient, private base_url: HttpReq) { }

  getAll(){
    return this.http.get < AccountTransactionModel [] > ( this.base_url.URL_API() + 'debits/');
  }

  create(
    owner: string,
    account: string,
    balanceBefore: string,
    amount: string,
    balanceAfter: string,
    operator: string,
    status: string,
    createdAt: string
  ): Observable <any>{
    return this.http.post < AccountTransactionModel > ( this.base_url.URL_API() + 'debits', {
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
    return this.http.get < AccountTransactionModel > ( this.base_url.URL_API() + `debits/${ id }`);
  }

  getByAccount(account: number) {
    return this.http.get < AccountTransactionModel > ( this.base_url.URL_API() + `debits/${ account }`);
  }

}
