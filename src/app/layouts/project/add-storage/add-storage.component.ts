import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';
import { ProjectService } from '../../../shared/services/project.service';
import { NgForm } from '@angular/forms';
import { Project } from '../../../shared/models/project';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from '../../../shared/services/toastr.service';

@Component({
  selector: 'app-add-storage',
  templateUrl: './add-storage.component.html',
  styleUrls: ['./add-storage.component.scss']
})


export class AddStorageComponent implements OnInit {
  event; 
  @Input() key: string;
  arrayF = [];
  project: Project; 

  constructor( 
    private storageService: StorageService,
    private projectService: ProjectService,
    private angularFireStorage: AngularFireStorage,
    private toastrService: ToastrService) {}

  ngOnInit() {
    this.getProjectDetail(this.key);
  }

  uploadFile(fileForm: NgForm) {
    if (this.event.target.files.length > 0) {
      for (let index = 0; index < this.event.target.files.length; index++) {
        let file = this.event.target.files[index];
        let name = this.event.target.files[index].name;
        let reference = this.angularFireStorage.ref(name);
        let upload = this.angularFireStorage.upload(name, file);
        reference.getDownloadURL().subscribe(
          (URL) => {
            this.arrayF.push(URL);
          },
          (err) => {
            console.log(err);
            console.log(this.event.target.files[index].name);
            console.log(reference);
          },
          () => this.sendFile(fileForm)
        );
      }

    }
  }

  sendFile(fileForm: NgForm){
    fileForm.value['projectName'] = this.project.projectName;
    fileForm.value['projectID'] = this.project.projectID;
    fileForm.value['category'] = this.project.category;
    fileForm.value['startDate'] = this.project.startDate;
    fileForm.value['deadLine'] = this.project.deadLine;
    fileForm.value['team'] = this.project.team;
    fileForm.value['files'] = this.arrayF;
    console.log(this.key);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(this.arrayF);
    this.projectService.updateProject(this.key, fileForm.value);
  }
  countFiles(event) {
    this.event = event;
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
				//y['$key'] = id;
				//this.project = y;
			},
			(error) => {
				this.toastrService.error('Error while fetching Project Detail', error);
			}
		);
	}
}
