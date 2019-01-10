import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from './contact';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contacts = [
        { id: 11, name: 'Petar Peric', username: 'Pera', phone: 123 },
        { id: 12, name: 'Nikola Nikolic', username: 'Dzoni', phone: 4213 },
        { id: 13, name: 'Milos Djokic', username: 'Djoka', phone: 315135 },
        { id: 14, name: 'Dusan Nikodijevic', username: 'Pika', phone: 123123123 },
        { id: 15, name: 'Marija Djordjevic', username: 'Mara', phone: 123123123 },
        { id: 16, name: 'Dragana Lukic', username: 'Gaga', phone: 123123123123 },
        { id: 17, name: 'Milos Vasic', username: 'Vaske', phone: 51553 },
        { id: 18, name: 'Dario Stankovic', username: 'Tarzan', phone: 1212312 },
        { id: 19, name: 'Aleksandar Nikolic', username: 'Aca', phone: 1949401 },
        { id: 20, name: 'Zoran Pesic', username: 'Zoka', phone: 29993213 }
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