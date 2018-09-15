import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  dataSource: any[];

  ngOnInit(){
    if(!localStorage.getItem('datasource')){
      this.dataSource = [];
      localStorage.setItem('datasource', JSON.stringify(this.dataSource));
    }
  }
}
