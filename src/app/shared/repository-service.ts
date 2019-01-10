import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { HttpErrorHandler, HandleError } from '../shared/htttp-error-handler.service';
import {HttpRequestService} from '../shared/http-request.service';
import { Contact } from './contact';
import { MessageService } from './message.service';

 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private contactUrl = 'api/contacts'; 
 
  constructor(private http: HttpClient, private httpR:HttpRequestService, httpErrorHandler: HttpErrorHandler, private messageService: MessageService) {
   }

  getContacts (): Observable<any> {
    return this.http.get<Contact[]>(this.contactUrl)
      .pipe(
      );
  }

  deleteContact(contact: Contact | number): Observable<Contact>{
    const id = typeof contact === 'number' ? contact : contact.id;
    const url = `${this.contactUrl}/${id}`;
    return this.http.delete<Contact>(url, httpOptions).pipe();
  }

  searchContacts(term: string): Observable<Contact[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Contact[]>(`${this.contactUrl}/?name=${term}`).pipe(
    );
  }

  addContact (contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactUrl, contact, httpOptions).pipe();
  }

  updateContact (contact: Contact): Observable<any> {
    return this.http.put(this.contactUrl, contact, httpOptions).pipe(
    );
  }

  getContact(id: number): Observable<Contact> {
    const url = `${this.contactUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
    );
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }

}