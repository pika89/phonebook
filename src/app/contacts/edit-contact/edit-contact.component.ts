import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {CommunicationServiceService} from '../../shared/communication-service.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MyErrorStateMatcher} from '../add-contact/add-contact.component';
import { RepositoryService } from 'src/app/shared/repository-service';


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
  user: Contacts[]=[];
  name: string;
  username: string;
  phone: number;

  firstNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
  ]);
  lastNameFormControl = new FormControl('', []);

  matcher = new MyErrorStateMatcher();

  constructor(public cs: CommunicationServiceService, public router: Router, private activeRoute: ActivatedRoute, public rs: RepositoryService) {
  
  }

  ngOnInit() {
    this.getOwnerDetails();
  }
  private getOwnerDetails = () =>{
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `users/` + id;
 
    this.rs.getData(apiUrl)
    .subscribe(res => {
      this.user = res as Contacts[];
    },
    (error) =>{
    })
  }
  

  saveContact() {
    this.firstNameFormControl.markAsTouched();
    this.phoneFormControl.markAsTouched();
    const index = this.dataSource.indexOf(this.result);

    if (this.firstNameFormControl.valid && this.phoneFormControl.valid) {
      this.dataSource[index].name = this.name;
      this.dataSource[index].username = this.username;
      this.dataSource[index].phone = this.phone;
      localStorage.setItem('datasource', JSON.stringify(this.dataSource));
      this.router.navigate(['/']);
    }
    else {
      return;
    }
  }


}
