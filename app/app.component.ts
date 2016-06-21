import { Component, OnInit } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { TutorialComponent }   from './tutorial.component';
import { HomeComponent }   from './home.component';
import { AddComponent }   from './add.component';

import { DialogService }         from './dialog.service';

@Component({
  selector: 'my-app',
  templateUrl: 'index4.html',
  providers:  [DialogService],
  directives: [ROUTER_DIRECTIVES]
})

@Routes([
	{path:'/Tutorial/:id', component: TutorialComponent},
	{path:'/Home', component: HomeComponent},
	{path:'/Add', component: AddComponent}
])

export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/Home']);
  }
}