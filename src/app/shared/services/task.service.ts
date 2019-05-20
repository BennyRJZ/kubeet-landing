import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { ToastrService } from './toastr.service';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: AngularFirestoreCollection<Task>;
  task: AngularFirestoreDocument<Task>;
  constructor(
    private db: AngularFirestore,
		private authService: AuthService,
		private toastrService: ToastrService
  ) { }

  getTasks(key: string) {
    this.tasks = this.db.collection('projects').doc(key).collection('tasks');
    return this.tasks;
    
  }

}
