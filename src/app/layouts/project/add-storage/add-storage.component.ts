import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';
import { ProjectService } from '../../../shared/services/project.service';
import { NgForm } from '@angular/forms';
import { Project } from '../../../shared/models/project';

@Component({
  selector: 'app-add-storage',
  templateUrl: './add-storage.component.html',
  styleUrls: ['./add-storage.component.scss']
})


export class AddStorageComponent implements OnInit {
  event; 
  @Input() key: string;
  arrayF = [];

  constructor( private storageService: StorageService, private projectService: ProjectService) {}

  ngOnInit() {}

  uploadFile(fileForm: NgForm) {
    let finished = false;
    if (this.event.target.files.length > 0) {
      for (let index = 0; index < this.event.target.files.length; index++) {
        const file = this.event.target.files[index];
        const reference = this.storageService.reference(this.event.target.files[index].name);
        const upload = this.storageService.upload(this.event.target.files[index].name, file);
        reference.getDownloadURL().subscribe(
          (URL) => {this.arrayF.push(URL)},
          (err) => {console.log("Error ")}
        );
        if (this.event.target.files === index + 1){
          finished = true;
        }
      }
      let project: Project;
      project = this.projectService.getProjectById(this.key);
      console.log(project)
      fileForm.value['projectName'] = project.projectName;
      fileForm.value['projectID'] = project.projectID;
      fileForm.value['category'] = project.category;
      fileForm.value['startDate'] = project.startDate;
      fileForm.value['deadLine'] = project.deadLine;
      fileForm.value['team'] = project.team;

      this.sendFile(fileForm)
    }
  }

  sendFile(fileForm: NgForm){
    fileForm.value['files']=this.arrayF;
    console.log(this.key);
    this.projectService.updateProject(this.key, fileForm.value);
  }
  countFiles(event)
  {
    this.event = event;
  }

}
