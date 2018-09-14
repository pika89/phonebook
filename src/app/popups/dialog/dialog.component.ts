import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {CommunicationServiceService} from '../../shared/communication-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  dataSource: any[]=[];
  firstName: string;
  lastName: string;
  phoneNumber: number;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, public cs: CommunicationServiceService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addContact(){
    let newContactObject = {firstName: this.firstName, lastName: this.lastName, phoneNumber: this.phoneNumber};
    this.dataSource.push(newContactObject);
    localStorage.setItem('datasource', JSON.stringify(this.dataSource));
    this.cs.passDataToContactList.next(this.dataSource);
    this.dialogRef.close();
  }

  ngOnInit() {
    this.dataSource = JSON.parse(localStorage.getItem('datasource'));

  }

}
