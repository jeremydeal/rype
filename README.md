<h1><em>Rype</em> Application Readme</h1>

<h3>App Structure</h3>

<em>Rype</em> embraces MVC architecture. The code is divided between:
<ul>
	<li>a Slim PHP "model" layer, which does nothing but manage database access with a URL router-based API</li>
	<li>an Angular JS "controller" layer that handles business logic, queries the API, and manipulates the data as needed</li>
	<li>and an Angular JS "view" layer that structures the data output of the controller layer</li>
</ul>

The application source code is all stored in the "web" folder.

Inside of "web", the backend is stored in the "api" folder. The other subdirectories in "web"
contain the HTML, CSS, Javascript, and AngularJS files. The AngularJS files are structured so that each
page--each major unit of functionality--has its own folder, e.g. "produce" for the produce view, controller,
and filters. App-wide code is divided into subdirectories by function, e.g. the "services" folder, which contains
all the Angular services for grabbing data from the API.