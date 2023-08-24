import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//import { LoginComponent } from './login/login.component';

import { AccountsComponent } from './accounts/accounts.component';
import { AccountModule } from './modules/account/account.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';

//
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatPaginatorModule} from '@angular/material/paginator';


//Importing Http client module because we have components that make http requests throught HttpClient module
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeAccountComponent } from './accounts/home-account/home-account.component';
import { EditAccountComponent } from './accounts/edit-account/edit-account.component';
import { AddAccountComponent } from './accounts/add-account/add-account.component';
import { UpdateAccountComponent } from './accounts/update-account/update-account.component';
import { DebitComponent } from './accounts/debit/debit.component';
import { CreditComponent } from './accounts/credit/credit.component';
import { Page404Component } from './errorPages/page404/page404.component';
import { Page500Component } from './errorPages/page500/page500.component';
import { Page403Component } from './errorPages/page403/page403.component';
import { RouterGuardsComponent } from './guards/router-guards/router-guards.component';
import { HistoricComponent } from './accounts/historic/historic.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignoutComponent } from './auth/signout/signout.component';
import { HomePageComponent } from './web/home-page/home-page.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BalanceComponent } from './accounts/balance/balance.component';
import { AlertModalComponent } from './dialog/dialog-animation/dialog-animation.component';
import { AlertDialogConfirmationComponent } from './dialog/alert-dialog-confirmation/alert-dialog-confirmation.component';
import { ErrorAlertDialogComponent } from './dialog/error-alert-dialog/error-alert-dialog.component';
import { SuccessAlertDialogComponent } from './dialog/success-alert-dialog/success-alert-dialog.component';
import { LoaderSpinnerComponent } from './spinner/loader-spinner/loader-spinner.component';
import { LoadingInterceptor } from './spinner/interceptor/loading.interceptor';
import { UserStatusComponent } from './auth/user-status/user-status.component';



@NgModule({
    declarations: [
        AppComponent,
        //LoginComponent,
        SignupComponent,
        //AccountsComponent,
        DashboardComponent,
        EditAccountComponent,
        AddAccountComponent,
        UpdateAccountComponent,
        Page404Component,
        Page500Component,
        Page403Component,
        RouterGuardsComponent,
        //HomeAccountComponent,
        DebitComponent,
        CreditComponent,
        HistoricComponent,
        SigninComponent,
        SignoutComponent,
        HomePageComponent,
        BalanceComponent,
        AlertModalComponent,
        AlertDialogConfirmationComponent,
        ErrorAlertDialogComponent,
        SuccessAlertDialogComponent,
        LoaderSpinnerComponent,
        UserStatusComponent
    ],
    providers: [
      {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        AccountModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        NgIf,
        NgFor,
        MatToolbarModule,
        MatMenuModule,
        MatSidenavModule,
        MatListModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule,
        MatNativeDateModule,
        MatDatepickerModule,
        AsyncPipe,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule,
        HomeAccountComponent,
        MatDialogModule
    ]
})
export class AppModule { }
