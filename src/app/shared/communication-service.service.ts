import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationServiceService {

  public passDataToContactList: Subject<any> = new Subject();
  public passContactObject: Subject<any> = new Subject();

  constructor() { }
}
