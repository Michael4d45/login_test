var register_form = document.getElementById('register_form');
register_form.onsubmit = function (e) {
  var url = "/api/users";
	e.preventDefault();
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
