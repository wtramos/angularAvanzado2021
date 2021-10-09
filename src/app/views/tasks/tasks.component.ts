import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from 'src/app/global/components/loader/loader.component';
import { TaskV1 } from 'src/app/models/Tasks.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  loading: boolean = false;
  tasksList: TaskV1[] = [];
  constructor(
    private _dialog: MatDialog,
    private _tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this._dialog.open(LoaderComponent);
    setTimeout(async () => {
      this._tasksService.getTasksV1().then(response => {
        this.tasksList = response;
      }).finally(() => {
        //TODO agregar el loading
        this._dialog.closeAll();
        this._tasksService.testingConnection();
        this.handlerListemUpdatingTask();
      })
    }, 2500);
  }

  public togglePhase(task: TaskV1, isNext: boolean): void {
		this._tasksService.updateTaksStatus(task, isNext);
	}

  public handlerListemUpdatingTask() {
    this._tasksService.onTaskUpdateHandler().subscribe(
      task => {
        console.log("Lo que esta viniendo del socket es: ", task);
        const index = this.tasksList.findIndex((task) => task.id === task.id);
        if (index > -1) {
          this.tasksList[index] = task;
        }
      },
      err => { console.error(err); },
      () => {
        console.log("completed!");
      }
    );
  }
}