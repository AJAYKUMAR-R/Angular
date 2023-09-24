import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  //seting the Subjects
  private _newServiceInteraction  = new Subject<string>();

  //set up the Observable to use it where ever it required
  $msgSource = this._newServiceInteraction.asObservable();

  constructor() { }


  getMessage(name:string){
    //adding the message to the Observable
    this._newServiceInteraction.next(name);
  }

}
