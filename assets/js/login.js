var login_form = document.getElementById('login_form');
login_form.onsubmit = function (e) {
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


export var Post = { run: function() {
  console.log("whatever");
  // put initializer stuff here
  // for example:
  // $(document).on('click', '.remove-post', my_remove_post_function)
}}
