
import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AccountServicesService } from "../../services/account/account-services.service";
import { Observable } from "rxjs";
import { CreditServicesService } from "src/app/services/transactions/credit-services.service";
import { EditAccountUtils } from "./EditAccountUtils";


@Injectable({
  providedIn: 'root'
})

export class CreditAccountUtils {

  constructor(private accountService: AccountServicesService, private creditServices: CreditServicesService,
    private editAcUtils: EditAccountUtils
    ) {}

  acc: any = '';
  balance = "";

  creditFormGroup (): FormGroup  {
    return new FormGroup({
      sourceAccount: new FormControl(''),
      owner: new FormControl(''),
      account: new FormControl(''),
      balanceBefore: new FormControl(''),
      amount: new FormControl(''),
      balanceAfter: new FormControl(''),
      operator: new FormControl(''),
      status: new FormControl(''),
      createdAt: new FormControl(''),
    });

  };


  /**
   *  This method gets the Form Group data comes from a form and pass them
   * to a variables and returns the same variables with the values received
   * @param form is a group of form fields
   * @returns
   */
  getFormData(form: FormGroup){

    const {
      sourceAccount,
      owner,
      account,
      balanceBefore,
      amount,
      balanceAfter,
      operator,
      status,
      createdAt
    } = form.value;

    return {
      sourceAccount,
      owner,
      account,
      balanceBefore,
      amount,
      balanceAfter,
      operator,
      status,
      createdAt
    };
  };

  setBalance(balanc: String){
    this.balance = String(balanc);
  }

  getBalance(){
    return this.balance;
  }

  getBalanceByAccount(account: string, form: FormGroup){

    this.accountService.getAll().subscribe({
      next: data => {
        //console.log(JSON.stringify(data, null, 2))

        /**
         * Load all accounts from database
         * and compare them to the account from form
         * if equals get this balance account and sum with the
         * amount to be credited
         * */
        for (let index = 0; index < data.length; index++) {
          const element = data[index].account;


          if(element === account){
            console.log(JSON.stringify(data[index], null, 6))
            this.acc = element;
            this.balance = data[index].currentBalance;
            var bala = data[index].currentBalance.replaceAll("€","");
            bala = bala.replaceAll(",","");
            var amoun = form.value.amount.replaceAll("€","");
            amoun = amoun.replaceAll(",","");
            var currentBalance = parseFloat(bala) + parseFloat(amoun);

            currentBalance.toString(), data[index].createdAt

            this.editAcUtils.updateAccountBalance(data[index].id,
              account,
              data[index].iban,
              data[index].swift,
              data[index].owner,
              data[index].ownerDoc,
              data[index].initialBalance,
              "€" + currentBalance.toString(),
              data[index].currency,
              data[index].createdAt,
              form.value.createdAt,
              data[index].isActive
              );
            break;
          }
        }
      },
      error: err => {
        alert( "Error")
      }
    })
  };

  creditAccount(form: FormGroup){
    this.creditServices.create(
        this.getFormData(form).sourceAccount,
        this.getFormData(form).owner,
        this.getFormData(form).account,
        this.getFormData(form).balanceBefore,
        this.getFormData(form).amount,
        this.getFormData(form).balanceAfter,
        this.getFormData(form).operator,
        this.getFormData(form).status,
        this.getFormData(form).createdAt,
      ).subscribe({
        next: data => {
          //console.log("========= Success to credit account! =============")
          //console.log(JSON.stringify(data, null, 2))
        },
        error: err => {
          //console.log("========= Failed to credit account! =============")
          //console.log(JSON.stringify(err, null, 2))
        }
    })
  }


  updateAccountBalance(id: number, balance: string){

  }

}
