
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApiUrl {

  URL_API(){
    return 'http://localhost:3000/';
  }

}
