import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountModel } from 'src/app/models/AccountModel';


const URL_API = 'http://localhost:3000/';


@Injectable({
  providedIn: 'root'
})
export class AccountServicesService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get < AccountModel [] >  ( URL_API + 'accounts/' );
  }

  create(payload: AccountModel){
    return this.http.post < AccountModel > (URL_API + 'accounts', payload );
  }

  getById(id: number){
    return this.http.get < AccountModel > ( URL_API + `accounts/${ id }` );
  }

  update(payload: AccountModel){
    return this.http.put < AccountModel > ( URL_API + `accounts/${ payload.id }`, payload );
  }

  delete(id: number){
    return this.http.delete < AccountModel > ( URL_API + `accounts/${ id }` )
  }

}
