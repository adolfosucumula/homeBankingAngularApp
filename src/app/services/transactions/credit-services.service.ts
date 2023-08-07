import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountTransactionModel } from 'src/app/models/AccountTransactionModel';
import { ApiUrl } from 'src/app/server/ApiUrl';
@Injectable({
  providedIn: 'root'
})
export class CreditServicesService {

  constructor(private http: HttpClient, private base_url: ApiUrl) { }

  getAll(){
    return this.http.get < AccountTransactionModel [] > ( this.base_url.URL_API() + 'credits/');
  }

  create(entity: AccountTransactionModel){
    return this.http.post < AccountTransactionModel > ( this.base_url.URL_API() + 'credits', entity );
  }

  getById(id: number) {
    return this.http.get < AccountTransactionModel > ( this.base_url.URL_API() + `credits/${ id }`);
  }

}
