import { Component, OnInit } from '@angular/core';
import { StorageService } from '../utils/StorageService.service';
import { AccountServicesService } from '../services/account/account-services.service';
import { AccountTransactionModel } from '../models/AccountTransactionModel';
import { HistoricServices } from '../services/transactions/historic-services.service';
import { SnackBarAlertMessage } from '../utils/snackBarAlertMessage';
import { AccountClass } from '../models/AccountModel';
import { MatTableDataSource } from '@angular/material/table';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{

    totalBalance = '122.200.000,00';
    currenc = [
      {currency: "EUR", icon: "euro_symbol", flag: "../../assets/img/ico/euro.ico"},
      {currency: "USD", icon: "monetization_on", flag: "../../assets/img/ico/dollar.ico"},
      {currency: "AOA", icon: "monetization_on", flag: "../../assets/img/ico/aoa.ico"},
  ];

    public isLogged = false;
    username: any;
    userAccount: any ;
    accountCredits!: AccountTransactionModel[];
    accountDebits!: AccountTransactionModel[];
    allAccounts!: AccountClass[];
    dataSource: any;
    dataList: any;

    constructor(private localStore: StorageService, private accountServices: AccountServicesService,
      private histServices: HistoricServices, private snackBarAlert: SnackBarAlertMessage
      ){ }

    ngOnInit(): void {
      this.isLogged = this.localStore.isLoggedIn();
      this.username = this.localStore.getUser();
      this.getCredits()
    }


    displayedColumns: string[] = ['id', 'account', 'iban', 'initialBalance', 'amount', 'owner', 'isActive', 'edit'];


    open(){
      alert("Open")
    }


    getCredits(){
      this.histServices.getAllCredits().subscribe((data: AccountTransactionModel) => {

        this.dataList = data;
          //this.dataSource = new MatTableDataSource(data);

        const array = JSON.stringify(this.accountServices.findByAccountInDBList(data, this.userAccount))
        const items = JSON.parse(array);
        console.log("==================  CREDITS ============================")
        console.log(items)
        if(items.size == 0) { this.snackBarAlert.openSnackBar("No account found for this user!", "Information", 10, 'bottom', "left"); }
        else{

        }
      })
    };
    getFormatted(_localLanguage: string = 'pt-PT', _currency: string = 'EUR', value: number): any {
      
      return new Intl.NumberFormat(_localLanguage, { style: 'currency', currency: _currency }).format(value);
    }

}
