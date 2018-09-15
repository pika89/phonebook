import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {CommunicationServiceService} from '../../shared/communication-service.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MyErrorStateMatcher} from '../add-contact/add-contact.component';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  dataSource: any[] = [];
  firstName: string;
  lastName: string;
  phoneNumber: string;
  contactId: string;
  result: any;

  firstNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
  ]);
  lastNameFormControl = new FormControl('', []);

  matcher = new MyErrorStateMatcher();

  constructor(public cs: CommunicationServiceService, public router: Router, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.dataSource = JSON.parse(localStorage.getItem('datasource'));
    this.activeRoute.params.subscribe((params: Params) => {
      this.contactId = params['id'];
    });
    this.result = this.dataSource.find(contact => this.contactId === contact.id.toString());
    if (this.result) {
      this.firstName = this.result.firstName;
      this.lastName = this.result.lastName;
      this.phoneNumber = this.result.phoneNumber;
    }

  }

  saveContact() {
    this.firstNameFormControl.markAsTouched();
    this.phoneFormControl.markAsTouched();
    const index = this.dataSource.indexOf(this.result);

    if (this.firstNameFormControl.valid && this.phoneFormControl.valid) {
      this.dataSource[index].firstName = this.firstName;
      this.dataSource[index].lastName = this.lastName;
      this.dataSource[index].phoneNumber = this.phoneNumber;
      localStorage.setItem('datasource', JSON.stringify(this.dataSource));
      this.router.navigate(['/']);
    }
    else {
      return;
    }
  }


}
