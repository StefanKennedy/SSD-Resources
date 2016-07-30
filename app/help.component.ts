import { Component }     from '@angular/core';
import { NgFor } from '@angular/common'
import { CanDeactivate, OnActivate, Router, RouteSegment } from '@angular/router';
import { Http, HTTP_PROVIDERS} from '@angular/http';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  templateUrl:'partials/Help.html',
  viewProviders: [HTTP_PROVIDERS],
  directives: [NgFor]
})
export class HelpComponent {
	
	constructor(public http : Http, private router : Router){
		this.http = http;
		this.router = router;
	}
	
	routerOnActivate(curr: RouteSegment): void{
		
		this.parameter = curr.getParam('id');
		
		var outerThis = this;
		
		this.returnClicked = function(){
			outerThis.router.navigate(['/Home']);
		}
		
		var extractData = function(res: Response) {
			outerThis.heading = res.heading;
			outerThis.content = res.content;
		}
		
		this.http.get('./json/Help/' + curr.getParam('id') + '.json').map((res: Response) => res.json()).subscribe(extractData);
		
	}

}