import { Component } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  //imports: [MatTableModule]
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
  ]
})
export class DashboardComponent {

}
