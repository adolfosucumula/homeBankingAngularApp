import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpReq } from '../server/HttpReq';

@Injectable({
  providedIn: 'root'
})
export class GenericServices {

  constructor(private endPoint: HttpReq, private http: HttpClient){}

  /**
   *
   * @param model
   * @param objToCreate
   * @returns
   */
  create<T>(model: T | any, objToCreate: T | any): Observable <T | T []> {
    return this.http.post <T | T[]>(`${this.endPoint.URL_API() + model.tableName}`, objToCreate);
  }

  /**
   *
   * @param model
   * @returns
   */
  read<T>(model: T | any): Observable <T | T[]> {
    return this.http.get <T | T[]>(`${ this.endPoint.URL_API() + model.tableName }`, this.endPoint.myHttpOption());
  }

  /**
   *
   * @param model
   * @param objToFind
   * @returns
   */
  find<T>(model: T | any, objToFind: T | any): Observable <T | T[]> {
    return this.http.get <T | T[]>(`${ this.endPoint.URL_API() + model.tableName }/${ objToFind }`);
  }

  /**
   *
   * @param model
   * @param objToUpdate
   * @returns
   */
  update<T>(model: T | any, objToUpdate: T | any): Observable <T | T[]> {
    return this.http.put <T | T[]> (`${this.endPoint.URL_API() + model.tableName}/${objToUpdate}`, model);
  }

  /**
   *
   * @param model
   * @param objToUpdate
   * @returns
   */
  updateByPatch<T>(model: T | any, objToUpdate: T | any): Observable <T | T[]> {
    return this.http.patch <T | T[]> (`${this.endPoint.URL_API() + model.tableName}/${objToUpdate}`, model);
  }

  /**
   *
   * @param model
   * @param objToDelete
   * @returns
   */
  delete<T>(model: T | any, objToDelete: T): Observable <T | T[]> {
    return this.http.delete <T | T[]> (`${this.endPoint.URL_API() + model.tableName}/${objToDelete}`)
  }

}
