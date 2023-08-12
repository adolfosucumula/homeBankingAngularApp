import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsComponent } from './accounts/accounts.component';
import { Page404Component } from './errorPages/page404/page404.component';
import { HistoricComponent } from './accounts/historic/historic.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignoutComponent } from './auth/signout/signout.component';
import { HomeAccountComponent } from './accounts/home-account/home-account.component';
import { AddAccountComponent } from './accounts/add-account/add-account.component';
import { EditAccountComponent } from './accounts/edit-account/edit-account.component';
import { DebitComponent } from './accounts/debit/debit.component';
import { CreditComponent } from './accounts/credit/credit.component';
import { HomePageComponent } from './web/home-page/home-page.component';
import { SignupComponent } from './auth/signup/signup.component';

//Here we define our routes
const routes: Routes = [
  //Redirect to Login component
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  //-------------------------------------------------------

  { path: 'home', component: HomePageComponent},

  { path: 'login', component: SigninComponent},
  { path: 'signup', component: SignupComponent},

  { path: 'logout', component: SignoutComponent},
  { path: 'dashboard', component: DashboardComponent,
    children: [
      {path: 'account/home', component: HomeAccountComponent,
      children: [
        {path: 'account/add', component: AddAccountComponent },
        {path: 'account/trans/credit/:id', component: CreditComponent },
        {path: 'account/edit/:id', component: EditAccountComponent },
        {path: 'account/delete/:id', component: HomeAccountComponent },
        {path: 'account/trans/debit/:id', component: DebitComponent },
      ]
      },


      {path: 'account/trans/debit', component: DebitComponent },

      {path: 'account/trans/credit', component: CreditComponent },
    ]
  },
  { path: 'accounts', component: AccountsComponent},
  { path: 'accounts/historics', component: HistoricComponent},

  //{ path: '**', component: Page404Component },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
