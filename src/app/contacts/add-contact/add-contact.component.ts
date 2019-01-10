import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { RepositoryService } from 'src/app/shared/repository-service';
import { Contact } from 'src/app/shared/contact';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})

export class AddContactComponent implements OnInit {
  contact = new Contact();

  firstNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
  ]);
  lastNameFormControl = new FormControl('', []);

  matcher = new MyErrorStateMatcher();
  constructor(public router: Router, private rs: RepositoryService) { }


  ngOnInit() {
  }

  addNewContact() {
    this.firstNameFormControl.markAsTouched();
    this.phoneFormControl.markAsTouched();
    
    if (this.firstNameFormControl.valid && this.phoneFormControl.valid) {
      this.rs.addContact(this.contact).subscribe();
      this.router.navigate(['/']);
    }
    else {
      return;
    }
  }

}
