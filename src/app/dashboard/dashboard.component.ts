import { Component } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../utils/StorageService.service';
import { Utils } from '../utils/Utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent {

  parentMessage = "Hello Child";

  constructor(private route: ActivatedRoute, private router: Router, private utils: Utils,
    private localStore: StorageService){}

  public isLogged = false;
  public isVisited = true;
  username: any;

  checkVisited(){
    let btn = document.querySelector('.btn-menu-sidebar');
    let sidebar = document.querySelector('.mat-drawer');
    this.isVisited = !this.isVisited;

  }

  ngOnInit(): void {

    this.isLogged = this.localStore.isLoggedIn();
    this.username = this.localStore.getUser();
    //Check is the  user is logged. If false redirect him to the login page
    if(!this.isLogged){
      this.router.navigate(['/login']);
    }
  //Check is the  user is active. If false redirect him to the inactive page
    if(!this.username.isActive){
      //this.router.navigate(['/user-inactive']);
    }


  }

  account(){
    this.router.navigate(['xx/account'], {relativeTo: this.route});
  }

  accountHome(){
    this.router.navigate(['account/home'], {relativeTo: this.route});
  }

  accountDebitNoParameter(){
    this.router.navigate(['account/trans/debit'], {relativeTo: this.route});
  }

  accountCredit(id: number){
    if(id > 0) this.router.navigate(['account/trans/credit/', id], {relativeTo: this.route});
  }

  accountCreditNoParameter(){
    this.router.navigate(['account/trans/credit'], {relativeTo: this.route});
  }

  accountHistoric(){
    this.router.navigate(['account/historics'], {relativeTo: this.route});
  }



}
