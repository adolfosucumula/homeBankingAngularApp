
import { Injectable } from '@angular/core';

//My imports authrntication requests controll
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to load users')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
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
    ).pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to sign in')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  /**
   * This the method that make a post request to sign up the user
   * @param form Group of the form fields
   * @returns
   */
  register(
    fullname: string,
    username: string,
    email: string,
    password: string,
    role: string,
    isActive: boolean,
    createdAt: string,
    updatedAt: string
  ): Observable <any> {
    return this.http.post <UserModel> ( this.httpReq.URL_API() + 'users/',
    {
      fullname,
      username,
      email,
      password,
      role,
      isActive,
      createdAt,
      updatedAt
    }
    ,this.httpReq.myHttpOption()
    ).pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to sign up')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

  /**
   *
   * @param username String variable to store the user that is sign out
   * @param date String variable to register the date
   * @returns
   */
  logout(username: string, date: string): Observable<any> {
    this.localStore.clearSession();
    this.localStore.saveUser({}, 0);
    this.localStore.isLoggedIn();
    return this.http.post(this.httpReq.URL_API() + 'signout',
    {
      username: username, date: date, signout: true
    }
    , this.httpReq.myHttpOption()
    ).pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError) // then handle the error
      catchError((err) => {
        console.log('error caught in service. When trying to log out')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }

}

