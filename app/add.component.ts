import { Component }     from '@angular/core';
import { CanDeactivate, OnActivate, Router, RouteSegment } from '@angular/router';
import { Http, HTTP_PROVIDERS} from '@angular/http';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import {Observable, Subject, ReplaySubject} from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Component({
  templateUrl:'partials/Add.html',
  viewProviders: [HTTP_PROVIDERS]
})
export class AddComponent {
	
	constructor(public http : Http, private router : Router){
		this.http = http;
		this.router = router;
	}	
	
	routerOnActivate(curr: RouteSegment): void{
		
		var urlTokens = curr.stringifiedUrlSegments.split("/");
		
		var outerThis = this;
		
		if(urlTokens[0] == "Edit"){
			var fillFields = function(res: Response){
				console.log(JSON.stringify(Object.keys(res.explains)));
				outerThis.heading = res.heading;
				var list = [];
				var keys = Object.keys(res.explains);
				for(var k in keys){
					list.push({"code":keys[k], "explain":res.explains[keys[k]]});
				}
				outerThis.explains = list;
				outerThis.exampleDescription = res.exampleDescription;
				outerThis.example = res.example;
				outerThis.extra = res.extra;
			}
			
			this.http.get('./json/' + curr.getParam('id') + '.json').map((res: Response) => res.json()).subscribe(fillFields);
		}else{
			this.explains = [{"code":"", "explain":""}];
		}
		this.focusedRow = -1;
		
		
		this.generateClicked = function(){
			var jsonObject = {};
			jsonObject["heading"] = this.heading;
			jsonObject["explains"] = {};
			for(var explain of this.explains){
				if(explain.code.length == 0 || explain.explain.length == 0){
					continue;
				}
				jsonObject["explains"][explain.code] = explain.explain;
			}
			jsonObject["exampleDescription"] = this.exampleDescription;
			jsonObject["example"] = this.example;
			jsonObject["extra"] = this.extra;
			
			outerThis.result = JSON.stringify(jsonObject);
		}
		
		this.resultClicked = function(){
			var range = document.createRange();
			range.selectNodeContents(document.getElementById("resultPre"));
			window.getSelection().removeAllRanges();
			window.getSelection().addRange(range);
		}
		
		this.listUpdated = function(index){
			if(index == outerThis.explains.length - 1){
				outerThis.explains.push({"code":"", "explain":""});
			}
		}
	
		this.listFocus = function(index){
			console.log("Got Focus " + index);
			outerThis.focusedRow = index;
		}
		
		this.listLostFocus = function(index){
			setTimeout(function(){ // Timeout to work out what the selected row is first
				console.log("Lost Focus " + index + " Focused row is: " + outerThis.focusedRow + " explians length is: " + outerThis.explains.length + " " + outerThis.explains[index].code + " " + outerThis.explains[index].explain);
				if(index == outerThis.explains.length - 1){
					return;
				}
				if(index == outerThis.focusedRow){
					outerThis.focusedRow = -1;
					return;
				}
				if(outerThis.explains[index].code.length == 0 && outerThis.explains[index].explain.length == 0){
					for(var i = index+1; i < outerThis.explains.length; i++){
						outerThis.explains[i-1].code = outerThis.explains[i].code;
						outerThis.explains[i-1].explain = outerThis.explains[i].explain;
					}
					outerThis.explains.splice(outerThis.explains.length - 1, 1);
				}
			}, 100);
		}
	}

}