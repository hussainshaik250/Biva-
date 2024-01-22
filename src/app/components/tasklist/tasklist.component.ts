import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup ,AbstractControl,ValidationErrors, Validators} from '@angular/forms';
import { DataService } from '../../shared/data.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})
export class TasklistComponent implements OnInit {
  formGroup!: FormGroup;
  @Input() formData: any;
  docId!: string;
  editMode:boolean=false;

  constructor(
    private _formBuilder: FormBuilder,
    private data: DataService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data1: any,
    private firestore:AngularFirestore
  ) {}

  ngOnInit(): void {
    // Initialize the form with or without data
    this.initializeForm();
  }

  initializeForm(): void {
    this.formGroup = this._formBuilder.group({
      taskname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      taskdescription: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      duedate: ['', Validators.required]
    });

    // If data is provided, populate the form
    if (this.data1 && this.data1.task) {
      this.editMode=true;
      this.data1.task.duedate=new Date()
      this.formGroup.patchValue(this.data1.task);
      this.firestore.collection('TaskData', ref =>
    ref.where('taskname', '==', this.data1.task.taskname).where('taskdescription', '==', this.data1.task.taskdescription))
    .snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.id))
    )
    .subscribe(docIds => {
      if (docIds.length > 0) {
        this.docId = docIds[0];
        
      } 
    });
    }
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.formGroup.get(controlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      

      // Call the service method to add or update data
      if (this.data1 && this.data1.task) {
        this.data.updateData(this.docId,this.formGroup.value);
        
      } else {
        // Add mode
        // Call the service method to add data
        this.data.addDataToFirestore(this.formGroup.value);
        this.dialog.closeAll()
      }

      // Close the dialog
      this.dialog.closeAll();
    }
    
  }

  closeDialog(): void {
    
    this.dialog.closeAll();
    
  }
}
