import { Component, Input } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from './utils/Utils';
import { StorageService } from './utils/StorageService.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

  @Input() item = ''; // decorate the property with @Input()
  currentItem = 'Television';

  constructor(private route: ActivatedRoute, private router: Router, private utils: Utils,
    private localStore: StorageService){}

  title = 'homeBankingApp';

  public isVisited = true;
  isLogged = false;

  rout = '';

  checkVisited(){
    let btn = document.querySelector('.btn-menu-sidebar');
    let sidebar = document.querySelector('.mat-drawer');
    this.isVisited = !this.isVisited;
    //btn?.setAttribute(`style`,`display:flex;`);
    //sidebar?.classList.toggle('active');
  }

  ngOnInit(): void{

    this.isLogged = this.localStore.isLoggedIn();
    //console.log("Is logged: "+this.isLogged);
  }

  signOut(){

    this.localStore.clearSession();
    this.localStore.isLoggedIn();
    //this.router.navigate(['/login']);

  }


}
