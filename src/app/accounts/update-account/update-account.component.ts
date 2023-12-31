import { Component } from '@angular/core';
import { DebitAccountUtils } from '../utils/DebitAccountUtils';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/services/account/account-services.service';
import { AccountUtils } from '../utils/accountUtils';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AccountClass } from 'src/app/models/AccountModel';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent {

  constructor (private router: Router, private accountServices: AccountServicesService, private utils: AccountUtils
    , private debiUtils: DebitAccountUtils) {}

  //Instances to controll the autocomplete field
  myControl = new FormControl('');
  allAccounts!: AccountClass[];
  filteredOptions: Observable<AccountClass[]> | undefined;

  /**
   * Create an object of instance using the FormGroup
   * class to manage the form fields value, controlling and validate them
   */
  accountForm: FormGroup = this.debiUtils.debitFormGroup();


  ngOnInit() {
    //First catch the typing event from form field and filter data using the filter method
    //that returns the object found on database list
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.getAccounts();
  }

  private _filter(value: string): AccountClass[] {
    const filterValue = value.toLowerCase();

    return this.allAccounts.filter(option => option.account.toString().toLowerCase().includes(filterValue));
  }

  getAccounts(){
    this.accountServices.getAll().subscribe((data: any) => {
      this.allAccounts = data;
    });
  }


}
