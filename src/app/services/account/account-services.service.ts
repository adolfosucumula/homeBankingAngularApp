import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountModel } from 'src/app/models/AccountModel';
import { ApiUrl } from 'src/app/server/ApiUrl';
@Injectable({
  providedIn: 'root'
})
export class AccountServicesService {

  constructor(private http: HttpClient, private baseUrl: ApiUrl  ) { }

  getAll(){
    return this.http.get < AccountModel [] >  ( this.baseUrl.URL_API() + 'accounts/' );
  }

  create(payload: AccountModel){
    return this.http.post < AccountModel > (this.baseUrl.URL_API() + 'accounts', payload );
  }

  getById(id: number){
    return this.http.get < AccountModel > ( this.baseUrl.URL_API() + `accounts/${ id }` );
  }

  update(payload: AccountModel){
    return this.http.put < AccountModel > ( this.baseUrl.URL_API() + `accounts/${ payload.id }`, payload );
  }

  delete(id: number){
    return this.http.delete < AccountModel > ( this.baseUrl.URL_API() + `accounts/${ id }` )
  }

}
