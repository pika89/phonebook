import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogComponent} from './popups/dialog/dialog.component';
import {MatDialogRef} from '@angular/material';
import {CommunicationServiceService} from './shared/communication-service.service';
import {DeleteDialogComponent} from './popups/delete-dialog/delete-dialog.component';



export interface Contacts {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['firstname', 'lastname', 'phonenumber', 'edit', 'delete'];
  dataSource: any[];
  addDialogRef: MatDialogRef<DialogComponent>;
  deleteDialogRef: MatDialogRef<DeleteDialogComponent>;

  constructor(public dialog: MatDialog, public cs:CommunicationServiceService) {
    this.cs.passDataToContactList
      .subscribe(
        (response) => {
          this.dataSource = response;
          localStorage.setItem('datasource', JSON.stringify(this.dataSource));
        },
        (error) => {
          console.log(error);
        }
      );
  }


  ngOnInit() {
    this.dataSource = JSON.parse(localStorage.getItem('datasource'));
  }

  deleteContact(element) {
    const index = this.dataSource.indexOf(element);
    this.deleteDialogRef = this.dialog.open(DeleteDialogComponent);
    this.cs.passContactObject.next(index);
  }

  addContact() {
    this.addDialogRef = this.dialog.open(DialogComponent);
  }

}
