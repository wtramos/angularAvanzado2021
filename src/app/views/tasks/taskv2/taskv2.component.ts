import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from 'src/app/global/components/loader/loader.component';
import { TasksV2 } from 'src/app/models/Tasks.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-taskv2',
  templateUrl: './taskv2.component.html',
  styleUrls: ['./taskv2.component.scss']
})
export class Taskv2Component implements OnInit {

	listTask: TasksV2[] = [];

	constructor(
		private _dialog: MatDialog,
		private _tasksSrv: TasksService
	) { }

	ngOnInit(): void {
		this._dialog.open(LoaderComponent);
		setTimeout(async () => {
			this._tasksSrv.getTasksV2().then((response) => {
				console.log(response);
		  		this.listTask = response;
			}).finally(() => {
				//TODO agregar el loading
				this._dialog.closeAll();
				this._tasksSrv.onTaskUpdateHandlerV2().subscribe({
					next: data => {
						this.listTask = data;
					}
				})
			});
			this._tasksSrv.testingConnection();
		}, 2500);
	}

	drop(event: CdkDragDrop<any> ): void {
		if(event.previousContainer === event.container){
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		}else {
			transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
		}
		console.log(this.listTask)
		this._tasksSrv.updateTaskStatusV2(this.listTask);
	}
}