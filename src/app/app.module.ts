import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TasklistComponent } from './components/tasklist/tasklist.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


import {MatButtonModule} from '@angular/material/button';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomDatePipe } from './timestamp.pipe';
import { DatePipe } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { CalendarModule,DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// import { MomentModule } from 'ngx-moment'; // Import the MomentModule
;
import moment from 'moment';

// import { NgChartsModule } from 'ng2-charts';









@NgModule({
  declarations: [
    AppComponent,
    
    TasklistComponent,
    HeaderComponent,
    DashboardComponent,
    CustomDatePipe,
    ChartComponent,
    
    // NgChartsModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"biva-4cf2a","appId":"1:155530946585:web:5cd1858c1f99a36eef2288","storageBucket":"biva-4cf2a.appspot.com","apiKey":"AIzaSyB3RoE6zyQVqIXoQUB4OR7CEaDAhT7dO3E","authDomain":"biva-4cf2a.firebaseapp.com","messagingSenderId":"155530946585"})),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
   
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
      // Other global configurations for the calendar module
      // Example: formats, startingDayOfWeek, etc.
    }),    // CalendarModule.forRoot({
    //   provide: 'calendarConfig',
    //   useFactory: () => ({
    //     dateAdapter: adapterFactory(moment),
    //     // Other configuration options if needed
    //   }),
    // }),
    // MomentModule, 
    // NgChartsModule,
    // MatNativeDateModule
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
