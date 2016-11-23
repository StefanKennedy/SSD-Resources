import { Component }     from '@angular/core';
import { CanDeactivate, OnActivate, Router, RouteSegment } from '@angular/router';
import { Http, HTTP_PROVIDERS} from '@angular/http';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import {Observable, Subject, ReplaySubject} from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Component({
  templateUrl:'partials/Home.html',
  viewProviders: [HTTP_PROVIDERS],
  directives: [ROUTER_DIRECTIVES]
})
export class HomeComponent {
	
	constructor(public http : Http, private router : Router){
		this.http = http;
		this.router = router;
	}	
	
	routerOnActivate(curr: RouteSegment): void{
		
		var outerThis = this;
		this.pageLinks = [];
		
		this.linkChosen = function(link){
			outerThis.router.navigate([link]);
		}
		
		var extractData = function(res: Response) {
			outerThis.pageLinks = res.links;
		}
		
		this.http.get('./json/home.json').map((res: Response) => res.json()).subscribe(extractData);
	}

}
