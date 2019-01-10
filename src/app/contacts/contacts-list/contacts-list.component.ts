import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource, MatTabLabel, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteDialogComponent } from '../../popups/delete-dialog/delete-dialog.component';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { RepositoryService } from 'src/app/shared/repository-service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Contact } from 'src/app/shared/contact';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'username', 'phone', 'edit', 'delete'];
  contact: Contact[];
  deleteDialogRef: MatDialogRef<DeleteDialogComponent>;
  private searchTerms = new Subject<string>();
  contacts$: Observable<Contact[]>;


  constructor(public dialog: MatDialog, private activeRoute: ActivatedRoute, private rs: RepositoryService, private router: Router) {

  }


  ngOnInit() {
    this.getContacts();
    this.contacts$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.rs.searchContacts(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getContacts() {
    this.rs.getContacts()
      .subscribe(contacts => this.contact = contacts);
  }

  delete(contact: Contact): void {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '200px',
      width: '300px',
      data: { contact: contact.id, full: contact },
    })
    dialogRef.afterClosed().subscribe(result => {
      this.contact = this.contact.filter(h => h !== result);

    });
  }

  editContact = (id) => {
    let url: string = `/contacts/${id.id}/edit`;
    this.router.navigate([url]);
  }

}
