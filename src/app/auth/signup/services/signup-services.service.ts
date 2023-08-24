import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupServicesService {

  constructor() { }


  /**
   *
   * @param dataList
   * @param username
   * @returns
   */
  thisUserExist(dataList: any | any, username: string): boolean {
    const isEqual = dataList.findIndex( (element: {username: string}) =>
    element.username  == username);

    if(isEqual >= 0) return true;
    else return false;
  }

 /**
   *
   * @param dataList
   * @param email
   * @returns
   */
 thisEmailExist(dataList: any | any, email: string): boolean {
  const isEqual = dataList.findIndex( (element: {email: string}) =>
  element.email  == email);

  if(isEqual >= 0) return true;
  else return false;
}

/**
   *
   * @param dataList
   * @param telephone
   * @returns
   */
thisTelephoneExist(dataList: any | any, telephone: string): boolean {
  const isEqual = dataList.findIndex( (element: {telephone: string}) =>
  element.telephone  == telephone);

  if(isEqual >= 0) return true;
  else return false;
}


}
