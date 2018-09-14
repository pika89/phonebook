import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {CommunicationServiceService} from '../../shared/communication-service.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  dataSource: any[]=[];
  index: any;


  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, public cs: CommunicationServiceService) {
    this.cs.passContactObject
      .subscribe(
        (response) => {
          this.index = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }


  ngOnInit() {
    this.dataSource = JSON.parse(localStorage.getItem('datasource'));
  }

  deleteContact(){
    this.dataSource.splice(this.index, 1);
    localStorage.setItem('datasource', JSON.stringify(this.dataSource));
    this.dataSource = JSON.parse(localStorage.getItem('datasource'));
    this.cs.passDataToContactList.next(this.dataSource);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  }
