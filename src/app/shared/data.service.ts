import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
interface Task {
  
  taskname: string;
  taskdescription: string;
  dueDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  tasks$!: any;


  constructor(private firestore: AngularFirestore) {
    
   }
  
 

  addDataToFirestore(dataToAdd:any) {
    

    // Add the data to the "TaskData" collection in Firestore
    this.firestore.collection('TaskData').add(dataToAdd)
      .then((docRef) => {
        console.log('Document written with ID:', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document:', error);
      });
  }
  getTaskData(): Observable<any[]> {
    return this.firestore.collection('TaskData').valueChanges();
  }

  updateData(docId: string, updatedData: any): void {
    // Update the data in the "TaskData" collection in Firestore
    this.firestore.collection('TaskData').doc(docId).update(updatedData)
      .then(() => {
        console.log('Document updated successfully');
      })
      .catch((error) => {
        console.error('Error updating document:', error);
      });
  }
  deleteStudent(row: any): Promise<void> {
    const docRef = this.firestore.collection('TaskData', ref =>
      ref.where('taskname', '==', row.taskname).where('taskdescription', '==', row.taskdescription))
      .get()
      .toPromise();
  
    return docRef
      .then((querySnapshot:any) => {
        if (querySnapshot.size > 0) {
          // Assuming you want to delete only the first matching document
          const docToDelete = querySnapshot.docs[0];
          return docToDelete.ref.delete();
        } else {
          throw new Error('Document not found');
        }
      });
  }
 

}
