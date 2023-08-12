import { Injectable, VERSION } from "@angular/core";
import { DatePipe, formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class CurrentDate {

  public today = new Date();
  private date = '';
  private hour = '';
  private pipe = new DatePipe('en-US');

  constructor(){

  }

  getDate(format: string){
    format = format ? format : "dd/MM/YYYY hh:mm";
    const cDate = formatDate(this.today, format, 'en-US');
    return cDate;
  }

  getDateTime(format: string){
    format = format ? format : "dd/MM/YYYY hh:mm";
    const cDate = formatDate(this.today, format, 'en-US');
    return cDate;
  }

}
