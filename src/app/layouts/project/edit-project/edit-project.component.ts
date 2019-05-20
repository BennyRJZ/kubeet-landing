import { Component, OnInit, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Project } from "src/app/shared/models/project";
import { ProjectService } from "../../../shared/services/project.service";
import { ToastrService } from "../../../shared/services/toastr.service";

declare var $: any;
declare var require: any;
const shortId = require("shortid");
const moment = require("moment");

@Component({
  selector: "app-edit-project",
  templateUrl: "./edit-project.component.html"
})
export class EditProjectComponent implements OnInit {
  @Input() key: string;
  @Input() id: string;
  project: Project;

  constructor(
    private projectService: ProjectService,
    private toastrService: ToastrService
  ) {
    this.project = new Project();
  }

  ngOnInit() {
    this.getProjectDetail(this.id);
  }

  editProject(projectForm: NgForm) {
    projectForm.value["projectID"] = "PROJ" + shortId.generate();

    this.projectService.updateProject( this.key, projectForm.value);

    $("#exampleModalLong").modal("hide");

    this.toastrService.success(
      "Project " + projectForm.value["projectName"], "has been updated successfully"
    );
  }

  getProjectDetail(id: string) {
    // this.spinnerService.show();
    const x = this.projectService.getProjectById(id);
    console.log("id " + id);
    x.snapshotChanges().subscribe(
      project => {
        console.log(x);
        this.project = project.payload.data();
      },
      error => {
        this.toastrService.error("Error while fetching Project Detail", error);
      }
    );
  }
}
