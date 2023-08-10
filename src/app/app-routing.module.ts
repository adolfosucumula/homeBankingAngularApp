import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TransactionComponent } from './transaction/transaction.component';
import { Page404Component } from './errorPages/page404/page404.component';

//Here we define our routes
const routes: Routes = [
  //Redirect to Login component
  //{path: '', redirectTo: 'login', pathMatch: 'full'},
  //-------------------------------------------------------
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'accounts', component: AccountsComponent},
  { path: 'trans', component: TransactionComponent},
  //{ path: '**', component: Page404Component },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
