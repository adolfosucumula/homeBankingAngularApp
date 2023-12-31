import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {delay, map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountServicesService } from 'src/app/services/account/account-services.service';
import { AccountUtils } from '../utils/accountUtils';
import { AccountClass } from 'src/app/models/AccountModel';
import { DebitAccountUtils } from '../utils/DebitAccountUtils';
import { CurrencyPipe } from '@angular/common';
import { CreditAccountUtils } from '../utils/CreditAccountUtils';
import { CreditServicesService } from 'src/app/services/transactions/credit-services.service';
import { SnackBarAlertMessage } from 'src/app/utils/snackBarAlertMessage';
import { EditAccountUtils } from '../utils/EditAccountUtils';

@Component({
  selector: 'app-output-transaction',
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.css'],
  providers: [CurrencyPipe]
})
export class DebitComponent implements OnInit{

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  submitted = false;
  id!:number;

  //
  constructor(private formBuilder: FormBuilder, private currencyPipe: CurrencyPipe,
   private creditServices: CreditServicesService
    , private utils: DebitAccountUtils, private router: Router, private route: ActivatedRoute,
    private accountService: AccountServicesService, private snackAlert: SnackBarAlertMessage,
    private editAccountUtils: EditAccountUtils) { }


  /**
   * Create an object of instance using the FormGroup
   * class to manage the form fields value, controlling and validate them
   */
  accountForm: FormGroup = this.utils.debitFormGroup();
  accountData: FormGroup = this.editAccountUtils.editFormGroup();

    ngOnInit(): void {

      //Function to validate the form fields according to the specific rules
      this.accountForm = this.formBuilder.group({
        owner: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200)] ],
        account: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]+$')] ],
        balanceBefore: ['', Validators.required ],
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
        if(form.balanceBefore){
          this.accountForm.patchValue({
            balanceBefore: this.currencyPipe.transform(form.balanceBefore.replace(/\D/g, '').replace(/^0+/, ''), 'EUR', 'symbol', '1.0-0')
          }, {emitEvent: false})
        }
      });

      //get router parameter
      this.route.paramMap.subscribe((param) => {
        this.id = Number(param.get('id'));

        this.getById(this.id);

      });

    };


    //Call AbstractControl class to check if the data from form fields conforms to the rule defined above
    get _fC(): {[key: string]: AbstractControl } {
      return this.accountForm.controls;
    };


    getById(id: number = 0){

      if(id > 0){
        this.accountService.getById(id).subscribe((data: any) => {
          this.accountForm.patchValue({
            owner: data.owner,
            account: data.account,
            balanceBefore: data.currentBalance,
            amount: '',
            balanceAfter: '',
            operator: 'Operator',
            status: 'Pendent',
            createdAt: this.date.value
          });

          //Preserve the account register to be used at next step
          this.accountData.patchValue(data);
        })
      }
    };


    onSubmit(): void {
      this.submitted = true;

      if(this.accountForm.invalid){
        return;
      }

      let balanceBefore = this.accountForm.value.balanceBefore;
      let amount = this.accountForm.value.amount;
      const account = this.accountForm.value.account;

      balanceBefore = balanceBefore.replaceAll("€","");
      balanceBefore = balanceBefore.replaceAll(",","");
      amount = amount.replaceAll("€","");
      amount = amount.replaceAll(",","");

      //get the ID account from the account list


      if( balanceBefore === 0 || amount === 0){
        this.snackAlert.openSnackBar("Insufficient funds to continue the operation. ", "Information", 10, 'bottom', "left")
        return;
      }
      if(Number(amount) > Number(balanceBefore) ){
        this.snackAlert.openSnackBar("Insufficient funds to continue the operation. Am " + (amount - balanceBefore < 0) + " Bf "+ balanceBefore, "Information", 10, 'bottom', "left")
        return;
      }

      var balanceAfter = parseFloat(balanceBefore) - parseFloat(amount);

      /// ====================  Debit on database ====================

        this.utils.debitAccount(this.accountForm, "€"+balanceBefore.toString(), "€"+balanceAfter.toString(), "O.Finalized");

        //==============  Now update the currency balance form account

        this.getAccount(account, balanceAfter.toString(), this.accountForm);


    };


    /**
     * Compare the value of this parameter with each account from the database to get its ID
     * @param account the account entered in field form
     */
    getAccount(account: number = 0, balanceAfter: string, form: FormGroup){ this.snackAlert.openSnackBar("Account"+ account, "Information", 10, 'bottom', "left")
      if(account > 0){
        this.accountService.getAll().subscribe((data: any) => {
          const array = JSON.stringify(this.accountService.findByAccountInDBList(data, account));
          const items = JSON.parse(array);
          if(items.size == 0){ this.snackAlert.openSnackBar("This account "+ account + " was not found!" , "Information", 10, 'bottom', "left") }
          else{
            this.editAccountUtils.updateAccount(items.id,Number(items.account), items.iban, items.owner, items.swift,
                Number(items.ownerDoc), items.currentBalance, "€"+balanceAfter, items.currency, form);
          }
        })
      }
    }



}
