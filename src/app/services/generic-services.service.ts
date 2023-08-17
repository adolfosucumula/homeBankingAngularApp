import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountModel } from 'src/app/models/AccountModel';
import { EndPoint } from 'src/app/server/EndPoint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericServices {

  constructor(private endPoint: EndPoint, private http: HttpClient){}

  /**
   *
   * @param model
   * @param objToCreate
   * @returns
   */
  create<T>(model: T | any, objToCreate: T | any): Observable <T | T []> {
    return this.http.post <T | T[]>(`${this.endPoint.URL() + model.tableName}`, objToCreate);
  }

  /**
   *
   * @param model
   * @returns
   */
  read<T>(model: T | any): Observable <T | T[]> {
    return this.http.get <T | T[]>(`${ this.endPoint.URL() + model.tableName }`);
  }

  /**
   *
   * @param model
   * @returns
   */
  find<T>(model: T | any, objToFind: T | any): Observable <T | T[]> {
    return this.http.get <T | T[]>(`${ this.endPoint.URL() + model.tableName }/${ objToFind }`);
  }

  /**
   *
   * @param model
   * @param objToUpdate
   * @returns
   */
  update<T>(model: T | any, objToUpdate: T | any): Observable <T | T[]> {
    return this.http.patch <T | T[]> (`${this.endPoint.URL() + model.tableName}/${objToUpdate.id}`, objToUpdate);
  }

  delete<T>(model: T | any, objToDelete: T): Observable <T | T[]> {
    return this.http.delete <T | T[]> (`${this.endPoint.URL() + model.tableName}/${objToDelete}`)
  }

}
