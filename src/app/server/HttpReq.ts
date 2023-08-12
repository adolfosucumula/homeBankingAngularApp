
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class HttpReq {

  private readonly url = 'http://localhost:2000/';

  URL_API(){
    return this.url;
  }

  myHttpOption(){
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

}
