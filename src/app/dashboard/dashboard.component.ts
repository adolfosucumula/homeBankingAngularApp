import { Component, Input } from '@angular/core';
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

  currentItem = 'Television';

  parentMessage = "Hello Child";
  constructor(private route: ActivatedRoute, private router: Router, private utils: Utils,
    private localStore: StorageService){}

  public isLogged = false;
  public isVisited = true;

  checkVisited(){
    let btn = document.querySelector('.btn-menu-sidebar');
    let sidebar = document.querySelector('.mat-drawer');
    this.isVisited = !this.isVisited;
    //btn?.setAttribute(`style`,`display:flex;`);
    //sidebar?.classList.toggle('active');
  }

  ngOnInit(): void {
    console.log("From dashboard")
    console.log(JSON.stringify(this.localStore.getUser()))
    console.log(JSON.stringify(this.localStore.isLoggedIn()))
    this.isLogged = this.localStore.isLoggedIn();
    if(!this.isLogged){
      console.log("User not logged")
      this.router.navigate(['/login']);
    }
  }

  account(){
    this.router.navigate(['account/home'], {relativeTo: this.route});
  }

}
