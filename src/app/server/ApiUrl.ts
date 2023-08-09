
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class ApiUrl {

  private readonly url = 'http://localhost:3000/';

  URL_API(){
    return this.url;
  }

}
