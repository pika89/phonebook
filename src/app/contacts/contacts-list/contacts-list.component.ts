import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MatTableDataSource, MatTabLabel} from '@angular/material';
import {DeleteDialogComponent} from '../../popups/delete-dialog/delete-dialog.component';
import { FormControl } from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {map, startWith, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { RepositoryService } from 'src/app/shared/repository-service';
import { ActivatedRoute,Router, Params } from '@angular/router';
import { environment } from "../../../environments/environment";
import { Contact } from 'src/app/shared/contact';

export interface Contacts {
  id: number;
  name: string;
  username: string;
  phone: number;
}


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


  constructor(public dialog: MatDialog,private activeRoute: ActivatedRoute, private rs: RepositoryService, private router: Router) {
  
  }


  ngOnInit() {
    this.getContacts();
    this.contacts$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable rs time the term changes
      switchMap((term: string) => this.rs.searchContacts(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }


  
  getContacts(): void {
    this.rs.getContacts()
    .subscribe(contacts => this.contact = contacts);
  }

  delete(contact: Contact): void {
    this.contact = this.contact.filter(h => h !== contact);
    this.rs.deleteContact(contact.id).subscribe();
  }

  editContact = (id) => {
    let url: string = `/contacts/${id.id}/edit`;
    this.router.navigate([url]);
  }

}
