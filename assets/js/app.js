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
var errors = document.getElementById('errors');
var info = document.getElementById('info');

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

function form_to_object(e){
  var object = {};
  var formData = new FormData(e.target);
  formData.forEach((value, key) => {object[key] = value});
  console.log(object);
  return object;
}

