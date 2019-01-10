import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from './contact';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contacts = [
        { id: 11, name: 'Mr. Nice', username: 'Nice', phone: 123 },
        { id: 12, name: 'Narco', username: 'NAR', phone: 4213 },
        { id: 13, name: 'Bombasto', username: 'Bombo', phone: 315135 },
        { id: 14, name: 'Celeritas', username: 'Cele', phone: 123123123 },
        { id: 15, name: 'Magneta', username: 'Magi', phone: 123123123 },
        { id: 16, name: 'RubberMan', username: 'Rubba', phone: 123123123123 },
        { id: 17, name: 'Dynama', username: 'Dyno', phone: 51553 },
        { id: 18, name: 'Dr IQ', username: 'IQ', phone: 1212312 },
        { id: 19, name: 'Magma', username: 'Mag', phone: 1949401 },
        { id: 20, name: 'Tornado', username: 'Toro', phone: 29993213 }
    ];
    return {contacts};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(contacts: Contact[]): number {
    return contacts.length > 0 ? Math.max(...contacts.map(hero => hero.id)) + 1 : 11;
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/