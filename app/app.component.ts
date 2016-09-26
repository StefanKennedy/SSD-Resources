import { Component, OnInit, NgModule } from '@angular/core';
import { CanDeactivate, OnActivate, Router, RouteSegment } from '@angular/router';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Http, HTTP_PROVIDERS} from '@angular/http';

import { TutorialComponent }   from './tutorial.component';
import { HomeComponent }   from './home.component';
import { HelpComponent }   from './help.component';

import { AddComponent }   from './add.component';
import { DialogService }         from './dialog.service';

import {Observable, Subject, ReplaySubject} from 'rxjs/Rx';

import 'rxjs/add/operator/map';


@Component({
  selector: 'my-app',
  templateUrl: 'index-page.html',
  viewProviders: [HTTP_PROVIDERS],
  providers:  [DialogService],
  directives: [ROUTER_DIRECTIVES]
})

@Routes([
	{path:'/#/Tutorial/:id', component: TutorialComponent},
	{path:'/', component: HomeComponent},
	{path:'/#/Home', component: HomeComponent},
	{path:'/#/Add', component: AddComponent},
	{path:'/#/Edit/:id', component: AddComponent},
	{path:'/#/Help/:id', component: HelpComponent}
])

export class AppComponent implements OnInit {
  constructor(public http: Http, private router: Router) {}

  ngOnInit() {
    this.router.navigate(['#/Home']);
	
	var outerThis = this;
	
	this.linkChosen = function(link){
		console.log("Link chosen " + link);
		outerThis.router.navigate([link]);
	}
	
	var extractHelpData = function(res: Response) {
		outerThis.helpLinks = res.links;
	}
	
	this.http.get('./json/help.json').map((res: Response) => res.json()).subscribe(extractHelpData);
  }
}