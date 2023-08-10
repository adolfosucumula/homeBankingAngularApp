import { Component, OnInit } from '@angular/core';
import { AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/services/account/account-services.service';
import { CurrencyPipe } from '@angular/common';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CreditServicesService } from 'src/app/services/transactions/credit-services.service';
import { CreditAccountUtils } from '../utils/CreditAccountUtils';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-input-transaction',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css'],
  providers: [CurrencyPipe]
})
export class CreditComponent implements OnInit{

  c_balance = "";

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());


  /**
   * Create an object of instance using the FormGroup
   * class to manage the form fields value, controlling and validate them
   */
  accountForm: FormGroup = new FormGroup({
    sourceAccount: new FormControl(''),
    owner: new FormControl(''),
    account: new FormControl(''),
    //balanceBefore: new FormControl(''),
    amount: new FormControl(''),
    //balanceAfter: new FormControl(''),
    operator: new FormControl(''),
    //status: new FormControl(''),
    createdAt: new FormControl(this.date),
  });

  submitted = false;

  //
  constructor(private formBuilder: FormBuilder, private currencyPipe: CurrencyPipe,
    private accountServices: AccountServicesService, private creditServices: CreditServicesService
    , private utils: CreditAccountUtils, private router: Router, private _snackBar: MatSnackBar) { }


    ngOnInit(): void {

      //Function to validate the form fields according to the specific rules
      this.accountForm = this.formBuilder.group({
        sourceAccount: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]+$')] ],
        owner: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200)] ],
        account: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]+$')] ],
        //balanceBefore: ['', Validators.required ],
        amount: ['', Validators.required ],
        //balanceAfter: ['', Validators.required ],
        operator: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200)] ],
        //status: ['', [Validators.required, Validators.minLength(2)] ],
        createdAt: ['', Validators.required ],
      });

      /**
       * Function to catch the event typing from currency field to check the values being typing by user
       * are valid or not.
       * First is removed the all non digit from field, next remove the leading zeros meaning the values might make sense,
       * at the end its neccessary to stop/disable function to emit any event, otherwise its gonna be on the infinity loop.
       * */
      this.accountForm.valueChanges.subscribe( form => {
        if(form.amount){
          this.accountForm.patchValue({
            amount: this.currencyPipe.transform(form.amount.replace(/\D/g, '').replace(/^0+/, ''), 'EUR', 'symbol', '1.0-0')
          }, {emitEvent: false})
        }
      });


    }

    //Call AbstractControl class to check if the data from form fields conforms to the rule defined above
    get _fC(): {[key: string]: AbstractControl } {
      return this.accountForm.controls;
    };


    onSubmit(): void {
      this.submitted = true;

      if(this.accountForm.invalid){
        return;
      }

      //console.log(JSON.stringify(this.accountForm.value, null, 2))

      if(this.accountForm.value.account === this.accountForm.value.sourceAccount){
        this.openSnackBar("The source account must be different from account", "Warning");
        //alert("The source account must be different from account")
        return ;
      }

      this.utils.getBalanceByAccount(this.accountForm.value.account, this.accountForm);


    };


    /**
     * Snackbar alert message
     * For horizontal position the values allowed are: start, center, end, left, right
     * For vertical position the values allowed are: top and bottom
     */
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    durationInSeconds = 10;

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action);
      this._snackBar.open(message, action, {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }



}
