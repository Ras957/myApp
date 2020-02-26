import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { Incidence } from "../model/Incidence";

@Injectable({
  providedIn: 'root'
})
export class IncidenceService {

  constructor() { }
}
