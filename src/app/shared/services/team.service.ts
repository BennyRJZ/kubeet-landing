import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Team } from '../models/team';
import { AuthService } from './auth.service';
import { ToastrService } from './toastr.service';

@Injectable()
export class TeamService {
  teams: AngularFirestoreCollection<Team>;
	team:  AngularFirestoreDocument<Team>;



	constructor(
		private db: AngularFirestore,
		private authService: AuthService,
		private toastrService: ToastrService
	) {
	}

	getTeams(keyProjects) {
	this.teams = this.db.collection("projects").doc(keyProjects).collection("teams");
	return this.teams;
	}

	createTeam(keyProjects, data: Team) {
		return this.db.collection("projects").doc(keyProjects).collection('teams').add(data);
	}

	getTeamById(keyProjects, key: string) {
		this.team =   this.db.collection("projects").doc(keyProjects).collection('teams').doc(key);
		return this.team;
	}

	updateTeam(keyProjects, key: string ,data:Team) {
	this.db.collection("projects").doc(keyProjects).collection('teams').doc(key).set(data);
	}

	deleteTeam(keyProjects, key: string) {
		this.db.collection("projects").doc(keyProjects).collection('teams').doc(key).delete();
	}

}

