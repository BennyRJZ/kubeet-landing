import { Project } from '../../../shared/models/project';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../shared/services/project.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { AuthService } from '../../../shared/services/auth.service';
@Component({
	selector: 'app-project-detail',
	templateUrl: './project-detail.component.html',
	styleUrls: [ './project-detail.component.scss' ]
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
	private sub: any;
	public key: string;
	project: Project;

	public startDate;
	public deadLine;

	constructor(
		private route: ActivatedRoute,
		private projectService: ProjectService,
		private toastrService: ToastrService,
		public authService: AuthService,
	) {
		this.project = new Project();
	}

	ngOnInit() {
		this.sub = this.route.params.subscribe((params) => {
			const id = params['id']; // (+) converts string 'id' to a number
			this.key = params['id'];
			this.getProjectDetail(id);
		});
	}

	getProjectDetail(id: string) {
		// this.spinnerService.show();
		const x = this.projectService.getProjectById(id);
		console.log("id " + id);
		x.snapshotChanges().subscribe(
			(project) => {
				console.log("project" + project)
				// this.spinnerService.hide();
				//const y = project.payload.data() as Project;
				this.project = project.payload.data();
				this.startDate = this.project.startDate.toDate();
				this.deadLine = this.project.deadLine.toDate();


				//y['$key'] = id;
				//this.project = y;
			},
			(error) => {
				this.toastrService.error('Error while fetching Project Detail', error);
			}
		);
	}

	/* addToCart(project: Project) {
		this.projectService.addToCart(project);
	} */

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
