import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../shared/models/task';
import { TaskService } from '../../../shared/services/task.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from '../../../shared/services/toastr.service';

declare var $: any;
declare var require: any;
declare var toastr: any;
const shortId = require('shortid');
const moment = require('moment');

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent implements OnInit {
  // VARIABLES
  @Input() key: string;
  task: Task = new Task();

  constructor(
    public taskService: TaskService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
  }
  createTask(taskForm: NgForm) {
    
    this.taskService.createTask(this.key, taskForm.value);
    this.task = new Task();
    
    $('#exampleModalLeng').modal('hide');
    toastr.success('Task' + taskForm.value['name'] + 'was added successfully.', 'Task Creation');
  }
  

}
