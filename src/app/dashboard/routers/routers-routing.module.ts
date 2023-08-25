import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard.component';
import { AccountsComponent } from 'src/app/accounts/accounts.component';
import { HistoricComponent } from 'src/app/accounts/historic/historic.component';
import { CreditComponent } from 'src/app/accounts/credit/credit.component';
import { HomeAccountComponent } from 'src/app/accounts/home-account/home-account.component';
import { AddAccountComponent } from 'src/app/accounts/add-account/add-account.component';
import { EditAccountComponent } from 'src/app/accounts/edit-account/edit-account.component';
import { DebitComponent } from 'src/app/accounts/debit/debit.component';
import { BalanceComponent } from 'src/app/accounts/balance/balance.component';
import { UserPageComponent } from 'src/app/user-page/user-page.component';

const routes: Routes = [


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutersRoutingModule { }
