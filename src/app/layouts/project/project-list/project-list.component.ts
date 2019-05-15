import { Component, OnInit } from '@angular/core';
import { Project } from '../../../shared/models/project';
import { AuthService } from '../../../shared/services/auth.service';
import { ProjectService } from '../../../shared/services/project.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
	projectList: Project[];
	projectObject: Project;

	loading = false;
	brands = ['All', 'Programación', 'Algoritmos', 'Test'];

	selectedBrand: 'All';

	page = 1;
	constructor(
		public authService: AuthService,
		private projectService: ProjectService,
		private toastrService: ToastrService
	) { }

	ngOnInit() {
		this.getAllProjects();
	}

	getAllProjects() {
		// this.spinnerService.show();
		this.loading = true;
		const x = this.projectService.getProjects();
		x.snapshotChanges().subscribe(
			(project) => {
				this.loading = false;
				// this.spinnerService.hide();
				this.projectList = [];
				project.forEach((element) => {
					//con y = element.payload.doc.data(). ..toJSON();
					//y['$key'] = element.key;
					this.projectObject = element.payload.doc.data();
					this.projectObject.$key = element.payload.doc.id; 
					console.log("data : " + this.projectObject.$key); 
					this.projectList.push(this.projectObject as Project);
				});
			},
			(err) => {
				this.toastrService.error('Error while fetching Projects', err);
			}
		);
	}

	removeProject(key: string) {
		this.projectService.deleteProject(key);
	}

	// addFavourite(project: Project) {
	// 	this.projectService.addFavouriteProject(project);
	// }

	// addToCart(project: Project) {
	// 	this.projectService.addToCart(project);
	// }
}
