import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MyErrorStateMatcher} from '../add-contact/add-contact.component';
import { RepositoryService } from 'src/app/shared/repository-service';
import { Contact } from 'src/app/shared/contact';


export interface Contacts {
  id: number;
  name: string;
  username: string;
  phone: number;
}

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})


export class EditContactComponent implements OnInit {
  user = new Contact();

  firstNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
  ]);
  lastNameFormControl = new FormControl('', []);

  matcher = new MyErrorStateMatcher();

  constructor(public router: Router, private activeRoute: ActivatedRoute, public rs: RepositoryService) {
  }

  ngOnInit() {
    this.getContact();
  }
  
  getContact(): void {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    this.rs.getContact(id)
      .subscribe(contact => this.user = contact);
  }

  saveContact() {
    this.firstNameFormControl.markAsTouched();
    this.phoneFormControl.markAsTouched();
    let id: string = this.activeRoute.snapshot.params['id'];
    this.rs.updateContact(this.user).subscribe();
  }
}
