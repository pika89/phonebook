import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MatTableDataSource, MatTabLabel} from '@angular/material';
import {DeleteDialogComponent} from '../../popups/delete-dialog/delete-dialog.component';
import {CommunicationServiceService} from '../../shared/communication-service.service';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { RepositoryService } from 'src/app/shared/repository-service';
import { ActivatedRoute,Router, Params } from '@angular/router';


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

  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'phone', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Contacts>();
  deleteDialogRef: MatDialogRef<DeleteDialogComponent>;
  title: string;


  constructor(public dialog: MatDialog, public cs: CommunicationServiceService,private activeRoute: ActivatedRoute, private rs: RepositoryService, private router: Router) {
  
  }


  ngOnInit() {
    this.getAllOwners();
  }

  public getAllOwners = () => {
    this.rs.getData('users')
    .subscribe(res => {
      this.dataSource.data = res as Contacts[];
    })
  }

  
  deleteContact(hero: Contacts): void {
    this.dataSource.data = this.dataSource.data.filter(h => h !== hero);
    this.rs.deleteHero(hero).subscribe();
  }

  editContact = (id: any) => {
    let url: string = `/contacts/${id.id}/edit`;
    this.router.navigate([url]);
  }

  // editContact(element){
  //   this.cs.passContactObject.next(element);
  // }

  public doFilter = (value) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
