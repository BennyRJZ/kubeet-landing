import { Injectable } from '@angular/core';
//import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Project } from '../models/project';
import { AuthService } from './auth.service';
import { ToastrService } from './toastr.service';

@Injectable()
export class ProjectService {
	//projects: AngularFireList<Project>;
	//project: AngularFireObject<Project>;
    projects: AngularFirestoreCollection<Project>;
	project:  AngularFirestoreDocument<Project>;

	// favouriteProjects
	//favouriteProjects: AngularFireList<FavouriteProject>;
	//cartProjects: AngularFireList<FavouriteProject>;
	// favouriteProjects: AngularFirestoreCollection<FavouriteProject>;
	// cartProjects:      AngularFirestoreDocument<FavouriteProject>;


	// // NavbarCounts
	// navbarCartCount = 0;
	// navbarFavProdCount = 0;

	constructor(
		private db: AngularFirestore,
		private authService: AuthService,
		private toastrService: ToastrService
	) {
		// this.calculateLocalFavProdCounts();
		// this.calculateLocalCartProdCounts();
	}

	getProjects() {
		//this.projects = this.db.list('projects');
		this.projects = this.db.collection('projects');
		//return this.db.collection('projects');
		return this.projects;
	}

	createProject(data: Project) {
		//this.projects.push(data);
		return this.db.collection('projects').add(data);
	}

	getProjectById(key: string) {
		this.project =   this.db.collection('projects').doc(key);
		//this.db.doc('projects/' + key);
		return this.project;
	}

	updateProject(data: Project) {
	//	this.projects.update(data.$key, data);
	}

	deleteProject(key: string) {
	//	this.projects.remove(key);
	}

	/*
   ----------  Favourite Project Function  ----------
  */

	// Get Favourite Project based on userId
// 	getUsersFavouriteProject() {
// 		const user = this.authService.getLoggedInUser();
// 	//	this.favouriteProjects = this.db.list('favouriteProjects', (ref) =>
// //			ref.orderByChild('userId').equalTo(user.$key)
// //		);
// 		return this.favouriteProjects;
// 	}

	// Adding New project to favourite if logged else to localStorage
	// addFavouriteProject(data: Project): void {
	// 	let a: Project[];
	// 	a = JSON.parse(localStorage.getItem('avf_item')) || [];
	// 	a.push(data);
	// 	this.toastrService.wait('Adding Project', 'Adding Project as Favourite');
	// 	setTimeout(() => {
	// 		localStorage.setItem('avf_item', JSON.stringify(a));
	// 		this.calculateLocalFavProdCounts();
	// 	}, 1500);
	// }

	// Fetching unsigned users favourite proucts
	// getLocalFavouriteProjects(): Project[] {
	// 	const projects: Project[] = JSON.parse(localStorage.getItem('avf_item')) || [];

	// 	return projects;
	// }

// 	// Removing Favourite Project from Database
// 	removeFavourite(key: string) {
// //		this.favouriteProjects.remove(key);
// 	}

// 	// Removing Favourite Project from localStorage
// 	removeLocalFavourite(project: Project) {
// 		const projects: Project[] = JSON.parse(localStorage.getItem('avf_item'));

// 		for (let i = 0; i < projects.length; i++) {
// 			if (projects[i].projectId === project.projectId) {
// 				projects.splice(i, 1);
// 				break;
// 			}
// 		}
// 		// ReAdding the projects after remove
// 		localStorage.setItem('avf_item', JSON.stringify(projects));

// 		this.calculateLocalFavProdCounts();
// 	}

// 	// Returning Local Projects Count
// 	calculateLocalFavProdCounts() {
// 		this.navbarFavProdCount = this.getLocalFavouriteProjects().length;
// 	}

	/*
   ----------  Cart Project Function  ----------
  */

	// Adding new Project to cart db if logged in else localStorage
	// addToCart(data: Project): void {
	// 	let a: Project[];

	// 	a = JSON.parse(localStorage.getItem('avct_item')) || [];

	// 	a.push(data);
	// 	this.toastrService.wait('Adding Project to Cart', 'Project Adding to the cart');
	// 	setTimeout(() => {
	// 		localStorage.setItem('avct_item', JSON.stringify(a));
	// 		this.calculateLocalCartProdCounts();
	// 	}, 500);
	// }

	// // Removing cart from local
	// removeLocalCartProject(project: Project) {
	// 	const projects: Project[] = JSON.parse(localStorage.getItem('avct_item'));

	// 	for (let i = 0; i < projects.length; i++) {
	// 		if (projects[i].projectId === project.projectId) {
	// 			projects.splice(i, 1);
	// 			break;
	// 		}
	// 	}
	// 	// ReAdding the projects after remove
	// 	localStorage.setItem('avct_item', JSON.stringify(projects));

	// 	this.calculateLocalCartProdCounts();
	// }

	// // Fetching Locat CartsProjects
	// getLocalCartProjects(): Project[] {
	// 	const projects: Project[] = JSON.parse(localStorage.getItem('avct_item')) || [];

	// 	return projects;
	// }

	// // returning LocalCarts Project Count
	// calculateLocalCartProdCounts() {
	// 	this.navbarCartCount = this.getLocalCartProjects().length;
	// }
}

export class FavouriteProject {
	project: Project;
	projectId: string;
	userId: string;
}
