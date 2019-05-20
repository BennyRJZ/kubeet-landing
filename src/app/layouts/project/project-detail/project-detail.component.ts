import { Project } from "../../../shared/models/project";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProjectService } from "../../../shared/services/project.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { AuthService } from "../../../shared/services/auth.service";
import { TeamService } from "../../../shared/services/team.service";
import { Team } from "../../../shared/models/team";
@Component({
  selector: "app-project-detail",
  templateUrl: "./project-detail.component.html",
  styleUrls: ["./project-detail.component.scss"]
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  public key: string;
  public id: any;
  project: Project;
  team: Team;
  teams: Team[] = [];

  public startDate;
  public deadLine;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private toastrService: ToastrService,
    public authService: AuthService,
    public teamService: TeamService
  ) {
    this.project = new Project();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"]; // (+) converts string 'id' to a number
      this.key = params["id"];
      this.getProjectDetail(this.id);
      this.getAllTeams(this.id);
    });
  }

  getProjectDetail(id: string) {
    // this.spinnerService.show();
    const x = this.projectService.getProjectById(id);
    console.log("id " + id);
    x.snapshotChanges().subscribe(
      project => {
        console.log("project" + project);
        this.project = project.payload.data();
        this.startDate = this.project.startDate;
        this.deadLine = this.project.deadLine;
      },
      error => {
        this.toastrService.error("Error while fetching Project Detail", error);
      }
    );
  }
  getAllTeams(id: string) {
    const less = this.teamService.getTeams(id);

    less.snapshotChanges().subscribe(
      team => {
        this.teams = [];
        for (let i = 0; i < team.length; i++) {
          this.team = team[i].payload.doc.data();
          this.team.$key = team[i].payload.doc.id;
          this.teams.push(this.team);
        }
      },
      error => {
        this.toastrService.error("Error while fetching Teams", error);
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
