@Routes([
	{path:'/', component:AppComponent, as:'Home'}
	{path:'/Tutorial', component:TutorialComponent, as:'Tutorial'}
])

export class AppComponent  implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/crisis-center']);
	his.pageLinks = [{heading:'Creating a Database',description:'Shows how to create a database local to your project.',link:'CreatingADatabase'}, {heading:'Connecting to the database',description:'Example code for connecting to the database and running a query', link:'ConnectingToTheDatabase'}];
  }
}