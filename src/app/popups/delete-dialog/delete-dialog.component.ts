import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  dataSource: any[]=[];
  index: any;


  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) {
    
  }


  ngOnInit() {
    this.dataSource = JSON.parse(localStorage.getItem('datasource'));
  }

  deleteContact(){
    this.dataSource.splice(this.index, 1);
    localStorage.setItem('datasource', JSON.stringify(this.dataSource));
    this.dataSource = JSON.parse(localStorage.getItem('datasource'));
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  }
