// Core Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// configuration and services
import { ProjectRoutes } from "./project.routing";

// Components
//import { CheckoutModule } from "./checkout/checkout.module";

import { ProjectComponent } from "./project.component";
// import { BestProjectComponent } from "./best-project/best-project.component";
import { ProjectListComponent } from "./project-list/project-list.component";
import { AddProjectComponent } from "./add-project/add-project.component";
import { ProjectDetailComponent } from "./project-detail/project-detail.component";
import { SharedModule } from "../../shared/shared.module";
import { AddStorageComponent } from './add-storage/add-storage.component';
import { AddTeamComponent } from './add-team/add-team.component';
// import { FavouriteProjectsComponent } from "./favourite-projects/favourite-projects.component";
// import { CartProjectsComponent } from "./cart-projects/cart-projects.component";
// import { CartCalculatorComponent } from "./cart-calculator/cart-calculator.component";

@NgModule({
	imports: [CommonModule, RouterModule.forChild(ProjectRoutes), SharedModule, /* CheckoutModule */],
	declarations: [
		ProjectComponent,
		// BestProjectComponent,
		ProjectListComponent,
		AddProjectComponent,
		ProjectDetailComponent,
		AddStorageComponent,
		AddTeamComponent,
		// FavouriteProjectsComponent,
		// CartProjectsComponent,
		// CartCalculatorComponent
	],
	exports: [
		// BestProjectComponent
	]
})
export class ProjectModule { }
