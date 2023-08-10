import { Component, OnInit } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/services/account/account-services.service';
import { AccountUtils } from '../accountUtils';
import { AccountModel } from 'src/app/models/AccountModel';

@Component({
  selector: 'app-output-transaction',
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
  ],
})
export class DebitComponent implements OnInit{

  constructor (private router: Router, private accountServices: AccountServicesService, private utils: AccountUtils) {}

  //Instances to controll the autocomplete field
  myControl = new FormControl('');
  allAccounts: AccountModel[] = [];
  filteredOptions: Observable<AccountModel[]> | undefined;

  ngOnInit() {
    //First catch the typing event from form field and filter data using the filter method
    //that returns the object found on database list
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.getAccounts();
  }

  private _filter(value: string): AccountModel[] {
    const filterValue = value.toLowerCase();

    return this.allAccounts.filter(option => option.account.toLowerCase().includes(filterValue));
  }

  getAccounts(){
    this.accountServices.getAll().subscribe({
      next: data => {
        this.allAccounts = data;
        //this.dataSource = new MatTableDataSource(this.allAccounts);
      },
      error: err => {console.log(err)
        if (err.error) {
          //this.errorMessage = JSON.parse(err.error).message;
        } else {

          //this.errorMessage = "Error with status: " + err.status;
        }
      }
    });
  }

}
