import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountTransactionModel } from 'src/app/models/AccountTransactionModel';
import { ApiUrl } from 'src/app/server/ApiUrl';

@Injectable({
  providedIn: 'root'
})

export class HistoricServices {

  constructor(private http: HttpClient, private base_url: ApiUrl){}

  getAllCredits(accountId: number): Observable < any > {
    return this.http.get(this.base_url.URL_API() + `credits/${ accountId }` );
  }

  getAllDebits(accountId: number): Observable < any > {
    return this.http.get(this.base_url.URL_API() + `debits/${ accountId }` );
  }


}
