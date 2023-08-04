import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TransactionComponent } from './transaction/transaction.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InputTransactionComponent } from './input-transaction/input-transaction.component';
import { OutputTransactionComponent } from './output-transaction/output-transaction.component';

//
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Importing Http client module because we have components that make http requests throught HttpClient module
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    //LoginComponent,
    SignupComponent,
    AccountsComponent,
    TransactionComponent,
    DashboardComponent,
    InputTransactionComponent,
    OutputTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,//Material Module
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
