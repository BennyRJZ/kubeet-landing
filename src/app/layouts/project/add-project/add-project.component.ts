import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/shared/models/project';
import { ProjectService } from '../../../shared/services/project.service';

declare var $: any;
declare var require: any;
declare var toastr: any;
const shortId = require('shortid');
const moment = require('moment');

@Component({
	selector: 'app-add-project',
	templateUrl: './add-project.component.html',
	styleUrls: [ './add-project.component.scss' ]
})
export class AddProjectComponent implements OnInit {
	project: Project = new Project();
	constructor(private projectService: ProjectService) {}

	ngOnInit() {}

	createProject(projectForm: NgForm) {
		projectForm.value['projectID'] = 'PROJ' + shortId.generate();


		this.projectService.createProject(projectForm.value);

		this.project = new Project();

		$('#exampleModalLong').modal('hide');

		toastr.success('project ' + projectForm.value['projectName'] + 'is added successfully', 'Project Creation');
	}
}
