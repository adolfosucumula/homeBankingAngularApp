import { Component,ChangeDetectionStrategy, OnInit, Input, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserModel } from 'src/app/models/UserModel';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainWindowComponent implements OnInit{

  user: UserModel = new UserModel()

  constructor(private title: Title){}


  @Input() page: string = ''

 ngOnInit(): void {
    this.title.setTitle(this.page)
  }


}
