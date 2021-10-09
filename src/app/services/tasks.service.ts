import { Injectable } from '@angular/core';
import { TasksV2, TaskV1 } from '../models/Tasks.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Injectable({
	providedIn: 'root'
})
export class TasksService {

	private socket: SocketIOClient.Socket;

	constructor(
		private _http: HttpClient
	) {
		this.socket = io(environment.BASE_URL);
	}

	public async getTasksV2(): Promise<TasksV2[]> {
		try {
			const response = await this._http.get<{tasksV2: TasksV2[]}>(environment.BASE_URL.concat('v3')).toPromise();
      console.log(response);
			return response.tasksV2;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	public async getTasksV1(): Promise<TaskV1[]> {
		try {
			const response = await this._http.get<{tasks: TaskV1[]}>(environment.BASE_URL).toPromise();
			return response.tasks;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	public testingConnection() : void {
		this.socket.emit('hello world', {
			connected: true
		});
	}

	public onTaskUpdateHandler(): Observable<TaskV1> {
		return Observable.create( (subscriber: Subscriber<TaskV1>) => {
			this.socket.on('tasksupdated', (task: TaskV1) => {
				subscriber.next(task);
			})
		})
	}

	public updateTaksStatus(task: TaskV1, isNext: boolean): void {
		// if(isNext){
		// 	task.type = task.type === 'done' ? 'done' : task.type === 'doing' ? 'done' : 'doing';
		// 	// TODO - RETO REFUERZO REFACTORIZAR ESTA FUNCION
		// }else {
		// 	task.type = task.type === 'todo' ? 'todo' : task.type === 'doing' ? 'todo' : 'doing'
		// }
    task.type = this.getType(isNext, task.type);
		this.socket.emit("tasksUpdate", task);
	}

  private getType(isNext: boolean, type: string){
    var taskType: string;
    if (isNext) {
      if (type === 'done'){
        taskType = 'done';
      }
      else if (type === 'doing'){
        taskType = 'done';
      }
      else {
        taskType = 'done';
      }
    }
    else{
      if (type === 'todo'){
        taskType = 'todo';
      }
      else if (type === 'doing'){
        taskType = 'todo';
      }
      else {
        taskType = 'doing';
      }
    }
    return taskType;
  } 

	public updateTaskStatusV2(listTask: TasksV2[]){
		this.socket.emit('tasksUpdate', listTask);
	}

	public onTaskUpdateHandlerV2(): Observable<TasksV2[]> {
		return Observable.create((subscriber: Subscriber<TasksV2[]>) => {
			this.socket.on('tasksupdated', (listTask: TasksV2[]) => {
				subscriber.next(listTask)
			})
		})
	}
}