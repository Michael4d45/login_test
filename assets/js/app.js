// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"
//

function POST(url, data, response){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
    console.log(this.readyState)
    console.log(this.status)
    console.log("")
		if (this.readyState == 4 && (this.status == 201 || this.status == 422 )) {
			console.log(this.responseText)
			response(JSON.parse(this.responseText))
		};
	}
	xhr.send(JSON.stringify(data));
}

function form_to_json(e){
  var formData = new FormData(e.target); 
  var object = {};
  formData.forEach((value, key) => {object[key] = value});
  console.log(object);
  return object;
}

var errors = document.getElementById('errors');
var info = document.getElementById('info');

var register_form = document.getElementById('register_form');
register_form.onsubmit = function (e) {
	e.preventDefault();
  var url = "/api/users";
	var data = {"user":{"email": register_form.elements[0].value, "password": register_form.elements[1].value}};
	var response = function(json){
    if(json.errors !== undefined) {
      errors.innerHTML += JSON.stringify(json.errors);
    }
    else if (json.data.email !== undefined && json.data.id !== undefined){
      errors.innerHTML = "";
    }
    else {
      info.innerHTML += JSON.stringify(json);
    }
  }
	POST(url, data, response);
}



var login_form = document.getElementById('login_form');
login_form.onsubmit = function (e) {
	e.preventDefault();
  var url = "/api/users/log_in";
	var data = {"user":{"email": login_form.elements[0].value, "password": login_form.elements[1].value}};
  var response = function(json){
    if(json.errors !== undefined) {
      errors.innerHTML += JSON.stringify(json.errors);
    }
    else if (json.data.email !== undefined && json.data.id !== undefined){
      errors.innerHTML = "";
    }
    else {
      info.innerHTML += JSON.stringify(json);
    }
  }
	POST(url, data, response);
}
