import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Contact } from './contact';
import { map, retry } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private contactUrl = 'api/contacts';

  constructor(private http: HttpClient) {
  }

  getContacts(): Observable<any> {
    const result = this.http.get<Contact[]>(this.contactUrl)
      .pipe(map((response) => {
        if (response == null) {
          return null;
        }
        return response;
      }),
        retry(3), // retry a failed request up to 3 times
      );
    return result;
  }

  deleteContact(contact: Contact | number): Observable<Contact> {
    const id = typeof contact === 'number' ? contact : contact.id;
    const url = `${this.contactUrl}/${id}`;
    const result = this.http.delete<Contact>(url, httpOptions).pipe(map((response) => {
      if (response == null) {
        return null;
      }
      return response;
    }),
    );
    return result;
  }

  searchContacts(term: string): Observable<Contact[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Contact[]>(`${this.contactUrl}/?name=${term}`).pipe(
    );
  }

  addContact(contact: Contact): Observable<Contact> {
    const result = this.http.post<Contact>(this.contactUrl, contact, httpOptions).pipe(map((response) => {
      if (response == null) {
        return null;
      }
      return response;
    }),
    );
    return result;
  }

  updateContact(contact: Contact): Observable<any> {
    const result = this.http.put(this.contactUrl, contact, httpOptions).pipe(map((response) => {
      if (response == null) {
        return null;
      }
      return response;
    }),
      retry(3), // retry a failed request up to 3 times
    );
    return result;
  }

  getContact(id: number): Observable<Contact> {
    const url = `${this.contactUrl}/${id}`;
    const result = this.http.get<Contact>(url).pipe(map((response) => {
      if (response == null) {
        return null;
      }
      return response;
    }),
      retry(3), // retry a failed request up to 3 times
    );
    return result;
  }

}