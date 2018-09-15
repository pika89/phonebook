import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {CommunicationServiceService} from '../../shared/communication-service.service';
import {Router} from '@angular/router';


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
  dataSource: any[] = [];
  firstName: string;
  lastName: string;
  phoneNumber: string;

  firstNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
  ]);
  lastNameFormControl = new FormControl('', []);

  matcher = new MyErrorStateMatcher();
  constructor(public cs: CommunicationServiceService, public router: Router) { }


  ngOnInit() {
    this.dataSource = JSON.parse(localStorage.getItem('datasource'));
  }


  addContact() {
    this.firstNameFormControl.markAsTouched();
    this.phoneFormControl.markAsTouched();

    if (this.firstNameFormControl.valid && this.phoneFormControl.valid) {
      let newContactObject = {id: this.generateId(),firstName: this.firstName, lastName: this.lastName, phoneNumber: this.phoneNumber};

      this.dataSource.push(newContactObject);
      localStorage.setItem('datasource', JSON.stringify(this.dataSource));
      this.cs.passDataToContactList.next(this.dataSource);
      this.router.navigate(['/']);
    }
    else {
      return;
    }
  }

  generateId(){
    const lastContact = this.dataSource[this.dataSource.length-1];
    return lastContact && lastContact.id ? lastContact.id + 1 : 1;
    // if(lastContact && lastContact.id){
    //   return lastContact.id + 1;
    // }
    // else{
    //   return 1;
    // }
  }

}
