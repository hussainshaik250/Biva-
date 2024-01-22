import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Task } from './task';
import { CustomDatePipe } from '../timestamp.pipe';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: AngularFirestore) {}

  // getTaskData(): Observable<Task[]> {
  //   return this.firestore.collection<Task>('TaskData').valueChanges();
  // }

  private convertToDate(timestamp: any): Date {
    // Implement your conversion logic here
    // For example, you can use toDate() method for Firestore Timestamps
    return timestamp ? timestamp.toDate() : null;
  }

  getTasks(): Observable<any[]> {
    return this.firestore
      .collection('TaskData')
      .valueChanges()
      .pipe(
        map((tasks: any[]) => {
          return tasks.map((task) => ({
            ...task,
            duedate: this.convertToDate(task.duedate),
            
          }));
        })
      );
  }

}
