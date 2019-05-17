import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../../shared/models/team';
import { TeamService } from '../../../shared/services/team.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from '../../../shared/services/toastr.service';

declare var $: any;
declare var require: any;
declare var toastr: any;
const shortId = require('shortid');
const moment = require('moment');

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})

export class AddTeamComponent implements OnInit {
  // VARIABLES
  @Input() key: string;
  team: Team = new Team();

  constructor(
    public teamService: TeamService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
  }
  createTeam(teamForm: NgForm) {
    teamForm.value['teamID'] = 'TEAM' + shortId.generate();
    
    this.teamService.createTeam(this.key, teamForm.value);
    this.team = new Team();
    
    $('#exampleModalLang').modal('hide');
    toastr.success('Team' + teamForm.value['name'] + 'was added successfully.', 'Team Creation');
  }

}
