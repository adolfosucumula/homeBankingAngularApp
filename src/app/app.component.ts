import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from './utils/Utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

  constructor(private route: ActivatedRoute, private router: Router, private utils: Utils){}

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


  }



}
