import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {CommunicationServiceService} from '../../shared/communication-service.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  dataSource: any[]=[];
  firstName: string;
  lastName: string;
  phoneNumber: string;

  firstNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
  ]);
  lastNameFormControl = new FormControl('', [

  ]);

  matcher = new MyErrorStateMatcher();

  constructor(public dialogRef: MatDialogRef<DialogComponent>, public cs: CommunicationServiceService) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addContact(){
    this.firstNameFormControl.markAsTouched();
    this.phoneFormControl.markAsTouched();
    if(this.firstNameFormControl.valid && this.phoneFormControl.valid){
      let newContactObject = {firstName: this.firstName, lastName: this.lastName, phoneNumber: this.phoneNumber};
      this.dataSource.push(newContactObject);
      localStorage.setItem('datasource', JSON.stringify(this.dataSource));
      this.cs.passDataToContactList.next(this.dataSource);
      this.dialogRef.close();
    }
     else{
       return
    }
    }

  ngOnInit() {
    this.dataSource = JSON.parse(localStorage.getItem('datasource'));

  }

}
