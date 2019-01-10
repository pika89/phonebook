import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Contact } from 'src/app/shared/contact';
import { RepositoryService } from 'src/app/shared/repository-service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  contact: Contact[] = [];

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, private rs: RepositoryService, @Inject(MAT_DIALOG_DATA) private data: any
   ) {
  }

  ngOnInit() {
  }

  deleteContact(contact: Contact){
    this.rs.deleteContact(this.data).subscribe();
    this.dialogRef.close(this.data.full);
  }

  onNoClick(): void {
    this.dialogRef.close();

  }

  }
