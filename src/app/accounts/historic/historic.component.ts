import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AccountModel } from 'src/app/models/AccountModel';
import { AccountTransactionModel } from 'src/app/models/AccountTransactionModel';
import { AccountServicesService } from 'src/app/services/account/account-services.service';
import { HistoricServices } from 'src/app/services/transactions/historic-services.service';
import { StorageService } from 'src/app/utils/StorageService.service';
import { SnackBarAlertMessage } from 'src/app/utils/snackBarAlertMessage';


@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent  implements OnInit{

  constructor(private accountServices: AccountServicesService, private histServices: HistoricServices,
    private localStore: StorageService, private snackBarAlert: SnackBarAlertMessage
     ) {}

    currentBalance: any = '0,00';
    userAccount: any = "0000000";
    userData: any;
    accountCredits!: AccountTransactionModel[];
    accountDebits!: AccountTransactionModel[];
    dataSource!: any;

    displayedColumns: string[] = ['id'];

  ngOnInit(): void {
    this.userData = this.localStore.getUser();

    this.getAccount();

    this.getCredits();

    console.log(JSON.stringify(this.accountCredits))
  }

  //dataSource = new MatTableDataSource<AccountTransactionModel>(this.accountCredits);

  getAccount(){
    this.accountServices.getAll().subscribe({
      next: data => {
        for (let index = 0; index < data.length; index++) {
          const element = data[index].ownerDoc;
          if(Number(element) === Number(this.userData.telephone)){
            this.userAccount = data[index].account;
            this.currentBalance = Number(data[index].currentBalance.replaceAll("€", ""));
            this.currentBalance= new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(this.currentBalance);
            break;
          }else{
            this.snackBarAlert.openSnackBar("No account found for this user!", "Information", 10, 'bottom', "left")
            break;
          }
        }
      },
      error: err => {
        console.log(JSON.stringify(err))
      }
    })
  };

  getCredits(){
    this.histServices.getAllCredits().subscribe({
      next: data => {
        for (let index = 0; index < data.length; index++) {
          const element = data[index].account;
          console.log(this.userAccount +" == " +element)
          console.log(Number(this.userAccount) === Number(element))
          if(Number(this.userAccount) === Number(element)){

          }
        }
      },
      error: err => {
        console.log(JSON.stringify(err))
      }
    })
  };

  getDebits(){
    this.histServices.getAllDebits().subscribe({
      next: data => {
        for (let index = 0; index < data.length; index++) {
          const element = data[index].ownerDoc;
          if(Number(element) === Number(this.userData.telephone)){
            this.userAccount = data[index].account;
            this.currentBalance = Number(data[index].currentBalance.replaceAll("€", ""));
            this.currentBalance= new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(this.currentBalance);
            break;
          }else{
            this.snackBarAlert.openSnackBar("No account found for this user!", "Information", 10, 'bottom', "left")
            break;
          }
        }
      },
      error: err => {
        console.log(JSON.stringify(err))
      }
    })
  };

}

