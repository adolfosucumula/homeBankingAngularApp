
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
import { GenericServices } from '../../generic-services.service';

let model: UserModel = new UserModel();

@Injectable({
  providedIn: 'root'
})

export class AuthServicesComponent {

  constructor(private localStore: StorageService, private services: GenericServices, private authUtils: AuthUtils,
    private httpReq: HttpReq, private http: HttpClient) {}

  signInFormData: FormGroup = this.authUtils.createSigninFormGroup();

  /**
   *
   */
  allUsers(): Observable <any>{
    //model.setTableName("accounts")
    return this.services.read(model)
    /*return this.http.get <UserModel> (this.httpReq.URL_API() + 'users/'
    ,this.httpReq.myHttpOption()
    )*/
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

    model.setTableName("loggeds")
    model.setUsername(username);
    model.setPassword(password);
    model.setCreatedAt(createdAt);
    console.log(model)
    return this.services.create(model, model)
    /*return this.http.post <UserModel> ( this.httpReq.URL_API() + 'loggeds/',
      {username, password , createdAt}
      ,this.httpReq.myHttpOption()
    )*/
    .pipe(
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
    telephone: number,
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
      telephone,
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

  /**
   *
   * @param dataList
   * @param id
   * @returns
   */
  findUserByIdInDBList(dataList: UserModel | any, id: Number): Observable <any> {
    return dataList.find((dataList: {id: Number}) => dataList.id == id );
  }

  /**
   *
   * @param dataList
   * @param username
   * @returns
   */
  findUserByUsernameInDBList(dataList: UserModel | any, username: string): Observable <any> {
    return dataList.find((dataList: {username: string}) =>  dataList.username == username );
  }

  /**
   *
   * @param dataList
   * @param email
   * @returns
   */
  findUserByEmailInDBList(dataList: UserModel | any, email: string): Observable <any> {
    return dataList.find((dataList: {email: string}) => dataList.email == email );
  }

}

