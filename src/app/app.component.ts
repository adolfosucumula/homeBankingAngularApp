import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'homeBankingApp';

  public isVisited = true;

  checkVisited(){
    let btn = document.querySelector('.btn-menu-sidebar');
    let sidebar = document.querySelector('.mat-drawer');
    this.isVisited = !this.isVisited;
    //btn?.setAttribute(`style`,`display:flex;`);
    //sidebar?.classList.toggle('active');
  }
}
