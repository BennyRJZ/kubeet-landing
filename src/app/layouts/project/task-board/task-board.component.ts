import { Component, OnInit, Input } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { TaskService } from "src/app/shared/services/task.service";
import * as _ from "lodash";
import { Task } from '../../../shared/models/task';
@Component({
  selector: "app-task-board",
  templateUrl: "./task-board.component.html",
  styleUrls: ["./task-board.component.scss"]
})

export class TaskActivitiesComponent implements OnInit {
  @Input() key: string;
  task: Task;
  taskList: Task[] = [];
  todo = new Array<any>();
  inProgress = new Array<any>();
  completed = new Array<any>();
  
  constructor(private taskService: TaskService) { 
    this.task = new Task();
  }

  ngOnInit() {
    this.getTasks();
  }
  
  getTasks()
  {
    const t = this.taskService.getTasks(this.key);
    t.snapshotChanges().subscribe(
    (task) => {
      this.taskList = [];
      for (let i=0;i<task.length;i++)
      {
        this.task = task[i].payload.doc.data();
        this.task.$key = task[i].payload.doc.id;
        this.taskList.push(this.task)
      }
      this.sortTask();
    });
    
  }

  sortTask() {
      var index = 0;
      this.taskList.forEach(task => {
        const boardId: string = task["boardId"];
        // Pushing Task to board based on boardId
        switch (boardId) {
          case "IK_PROGRESS":
            this.inProgress.push(task);
            break;
          case "IK_COMPLETED":
            this.completed.push(task);
            break;
          default:
            this.todo.push(task);
            break;
        }
        // Sorting Board Cards based on columnIndex
        this.todo = _.sortBy(this.todo, ["columnIndex"]);
        this.inProgress = _.sortBy(this.inProgress, ["columnIndex"]);
        this.completed = _.sortBy(this.completed, ["columnIndex"]);
        console.log(this.taskList);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.container.data);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  onSelect(event) {
    console.log(event);
  }
}
