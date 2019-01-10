import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';



import {
  ErrorStateMatcher,
  MatButtonModule, MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule, ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DeleteDialogComponent } from './popups/delete-dialog/delete-dialog.component';
import {RouterModule, Routes} from '@angular/router';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { ContactsListComponent } from './contacts/contacts-list/contacts-list.component';
import { EditContactComponent } from './contacts/edit-contact/edit-contact.component';
import { HttpErrorHandler } from './shared/htttp-error-handler.service';
import { MessageService } from './shared/message.service';
import { HttpRequestService } from './shared/http-request.service';
import { InMemoryDataService } from './shared/in-memory-data.service';

const appRoutes: Routes = [
  { path: '', component: ContactsListComponent },
  { path: 'contacts/new', component: AddContactComponent },
  { path: 'contacts/:id/edit', component: EditContactComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DeleteDialogComponent,
    AddContactComponent,
    ContactsListComponent,
    EditContactComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [DeleteDialogComponent],
  providers: [ HttpErrorHandler, MessageService, HttpRequestService, {
    provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
