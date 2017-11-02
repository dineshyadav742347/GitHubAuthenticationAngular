import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userProfile: any = {gitId: '', gitProfile: ''};
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  	this.dashboardService.getUserProfile().subscribe((response) => {
      console.log(response);
  		this.userProfile = response;
      console.log(this.userProfile);  
  	});
  }

}
