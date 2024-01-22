import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../shared/data.service';
import { TasklistComponent } from '../tasklist/tasklist.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['taskname', 'taskdescription', 'duedate','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedTask: any;
  addMode:boolean=true;




  constructor(private firestore:AngularFirestore,private data:DataService,private dialog:MatDialog){}

  ngOnInit(): void {
    this.getUsersList()
  }

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsersList(): void {
    this.data.getTaskData().subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } 
      },
      error: (err) => {
       
      },
    });
  }

  addTask() {
    const dialogRef = this.dialog.open(TasklistComponent, {
      width: '400px',
       height:'380px',
       
      
    });
    
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle any data passed back from the dialog if needed
     
      
      
    });
    
  }

  editTask(selectedTask:any){

    const dialogRef = this.dialog.open(TasklistComponent, {
      width: '400px',
       height:'380px',
       data: { task: selectedTask },
      
    });
    
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle any data passed back from the dialog if needed
     
      this.getUsersList()
      
      
    });

  }

  async deleteTask(row: any): Promise<void> {
    if (window.confirm('Are you sure you want to delete ' + row.taskname + ' ?')) {
      await this.data.deleteStudent(row);
      
    }
  }

}