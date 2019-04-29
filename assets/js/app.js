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
var url = "/api/users";

function POST(data, response){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 201) {
			response(JSON.parse(this.responseText))
		};
	}
	xhr.send(JSON.stringify(data));
}

var form = document.getElementById('new_user');
var users = document.getElementById('users');
form.onsubmit = function (e) {
	e.preventDefault();
  var object = {};
  var formData = new FormData(e.target);
  formData.forEach((value, key) => {object[key] = value});
  console.log(object);

	var data = {"user":{"email": form.elements[0].value, "password": form.elements[1].value}};
	var response = function(json){users.innerHTML += "<div>" + json.data.name + " : " + json.data.password + "</div>\n"}
	POST(data, response);
}

