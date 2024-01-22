import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { Chart,registerables } from 'chart.js';
Chart.register(...registerables);
import { Task } from '../../shared/task';
import { TaskService } from '../../shared/task.service';
import { CalendarEvent, DAYS_OF_WEEK } from 'angular-calendar';
import { addDays, startOfDay, endOfDay, format } from 'date-fns';
import { CustomDatePipe } from '../../timestamp.pipe';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit  {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  calendarEvents: any[] = [];
  taskData!: any[];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      console.log('Task Data:', (this.taskData = data));

      // Convert duedate to valid format
      this.taskData.forEach((task) => {
        task.duedate = this.convertToDate(task.duedate);
      });

      this.filterPendingTasks();
      console.log('Calendar Events:', this.calendarEvents);
    });
  }

  convertToDate(timestamp: any): Date {
    if (timestamp instanceof Date) {
      return timestamp;
    }

    if (timestamp && timestamp.toDate) {
      return timestamp.toDate();
    }

    return new Date();
  }

  dayClicked({ day }: { day: any }): void {
    console.log('Day clicked', day);
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  getDayHeader(date: Date): string {
    return format(date, 'EEE');
  }

  filterPendingTasks(): void {
    const nextWeek = addDays(this.viewDate, 30);

    this.calendarEvents = this.taskData
      .filter((task) => task.duedate && new Date(task.duedate) <= nextWeek && task.status !== 'completed')
      .map((task) => {
        const formattedDueDate = task.duedate ? format(task.duedate, 'EEE MMM dd yyyy') : 'N/A';
        return {
          title: `${task.taskname || task.taskdescription || 'Unknown Task'} - Due: ${formattedDueDate}`,
          start: new Date(task.duedate),
          color: { primary: '#F52B07', secondary: '#76DBC4' },
        };
      });
  }
}
