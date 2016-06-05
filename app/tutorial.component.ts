import { Component }     from '@angular/core';
import {NgFor} from '@angular/common'
import { CanDeactivate, OnActivate, Router, RouteSegment } from '@angular/router';
import { Http, HTTP_PROVIDERS} from '@angular/http';
import { Pipe, PipeTransform} from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import {Observable, Subject, ReplaySubject} from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Pipe({name:'explainsValues', pure:false})
export class explainsPipe implements PipeTransform{
	
	transform(value: any, args: any[] = null): any {
		return Object.keys(value);
	}
	
}

@Component({
  templateUrl:'partials/Tutorial.html',
  viewProviders: [HTTP_PROVIDERS],
  pipes: [explainsPipe],
  directives: [NgFor]
})
export class TutorialComponent {
	
	constructor(public http : Http, private router : Router){
		this.http = http;
		this.router = router;
	}	
	
	routerOnActivate(curr: RouteSegment): void{
		
		console.log(curr.getParam('id') + ".json");
		this.explains = {};
		
		var outerThis = this;
		
		this.returnClicked = function(){
			outerThis.router.navigate(['/Home']);
		}
		
		var extractData = function(res: Response) {
			outerThis.heading = res.heading;
			outerThis.explains = res.explains;
			outerThis.exampleDescription = res.exampleDescription;
			outerThis.example = res.example;
			outerThis.extra = res.extra;
		}
		
		this.http.get('./' + curr.getParam('id') + '.json').map((res: Response) => res.json()).subscribe(extractData);
		
		
		/*.success(function(data){
			this.heading = data.heading;
			console.log(JSON.stringify(data));
			this.explains = data.explains;
			this.exampleDescription = data.exampleDescription;
			this.example = data.example;
			this.extra = data.extra;
		});*/
	}

}