import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  ErrorStateMatcher,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule, ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {AppComponent} from './app.component';
import {DialogComponent} from './popups/dialog/dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DeleteDialogComponent } from './popups/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [DialogComponent, DeleteDialogComponent],
  providers: [{
    provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
