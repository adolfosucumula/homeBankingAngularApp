
import { Injectable } from '@angular/core';

//My imports authrntication requests controll
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpReq } from 'src/app/server/HttpReq';
import { StorageService } from 'src/app/utils/StorageService.service';
import { AuthUtils } from 'src/app/utils/AuthUtils';
import { FormGroup } from '@angular/forms';
import { UserModel } from 'src/app/models/UserModel';

//const httpOptions = {
  //headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//};


@Injectable({
  providedIn: 'root'
})

export class AuthServicesComponent {

  constructor(private localStore: StorageService, private authUtils: AuthUtils,
    private httpReq: HttpReq, private http: HttpClient) {}

  signInFormData: FormGroup = this.authUtils.createSigninFormGroup();

  /**
   *
   */
  allUsers(): Observable <any>{
    return this.http.get <UserModel> (this.httpReq.URL_API() + 'users/'
    ,this.httpReq.myHttpOption()
    )
  }

  /**
   * This the method that make a post request to log in
   * @param form Group of the form fields
   * @returns
   */
  signIn(username: string, password: string, createdAt: string): Observable <any> {
    return this.http.post <UserModel> ( this.httpReq.URL_API() + 'loggeds/',
      {username, password , createdAt}
      ,this.httpReq.myHttpOption()
    );
  }

  /**
   * This the method that make a post request to sign up the user
   * @param form Group of the form fields
   * @returns
   */
  register(form: FormGroup): Observable <any> {
    return this.http.post <UserModel> ( this.httpReq.URL_API() + 'users/',
    form
    ,this.httpReq.myHttpOption()
    )
  }


  logout(): Observable<any> {
    this.localStore.clearSession();
    this.localStore.saveUser({}, 0);
    this.localStore.isLoggedIn();
    return this.http.post(this.httpReq.URL_API() + 'signout', {signout: true}
    , this.httpReq.myHttpOption()
    );
  }

}

