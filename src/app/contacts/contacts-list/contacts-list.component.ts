import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DeleteDialogComponent} from '../../popups/delete-dialog/delete-dialog.component';
import {CommunicationServiceService} from '../../shared/communication-service.service';

export interface Contacts {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: number;
}


@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'phonenumber', 'edit', 'delete'];
  dataSource: any[];
  deleteDialogRef: MatDialogRef<DeleteDialogComponent>;
  title: string;

  constructor(public dialog: MatDialog, public cs: CommunicationServiceService) {
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

  editContact(element){
    this.cs.passContactObject.next(element);
  }
}
