import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


import { AccountClass } from 'src/app/models/AccountModel';
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
    private localStore: StorageService, private snackBarAlert: SnackBarAlertMessage,

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

    //this.getAccount();

    //this.getCredits();

    //console.log("=================== I GET from the factory =================")
    //console.log(JSON.stringify(this.getCreditFactory.getCredits()))
  }

  //dataSource = new MatTableDataSource<AccountTransactionModel>(this.accountCredits);

  getAccount(){
    this.accountServices.getAll().subscribe((data: any) => {
      const array = JSON.stringify(this.accountServices.findByOwnerDocInDBList(data, this.userData.ownerDoc))
      const items = JSON.parse(array);
      if(items.size == 0) { this.snackBarAlert.openSnackBar("No account found for this user!", "Information", 10, 'bottom', "left"); }
      else{
        this.userAccount = items.account;
        this.currentBalance = Number(items.currentBalance.replaceAll("€", ""));
        this.currentBalance= new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(this.currentBalance);
      }
    })

  };

  /**
   *
   */
  getCredits(){
    this.histServices.getAllCredits().subscribe((data: AccountTransactionModel) => {
      const array = JSON.stringify(this.accountServices.findByAccountInDBList(data, this.userAccount))
      const items = JSON.parse(array);
      console.log("==================  CREDITS ============================")
      console.log(items)
      if(items.size == 0) { this.snackBarAlert.openSnackBar("No account found for this user!", "Information", 10, 'bottom', "left"); }
      else{

      }
    })
  };

  /**
   *
   */
  getDebits(){
    this.histServices.getAllDebits().subscribe((data: AccountTransactionModel) => {
      const array = JSON.stringify(this.accountServices.findByOwnerDocInDBList(data, this.userAccount))
        const items = JSON.parse(array);
        if(items.size == 0)  this.snackBarAlert.openSnackBar("No account found for this user!", "Information", 10, 'bottom', "left");
        else{
          this.userAccount = items.account;
          this.currentBalance = Number(items.currentBalance.replaceAll("€", ""));
          this.currentBalance= new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(this.currentBalance);
        }
    })
  };

}

