var ElementGenerator = (function(templatesPath, templatesType){
	var Levels = { 
		ERROR : 'ERROR',
		INFO : 'INFO',
		WARNING : 'WARNING'
	};

	var build = function(name, data, outputId) {
		asyncRequest({
			url : getFullName(name),
			success : function(template){
				renderAndAppend(template, data, outputId);
				log('Success rendering the template ' + name, Levels.INFO);
			},
			error : function(){
				log('\'' + getFullName(name) + '\' File not found when try to get a template', Levels.ERROR);
			}
		});
	};

	var renderAndAppend = function (template, data, outputId) {
		var rendered = Mustache.render(template, data);
		document.getElementById(outputId).innerHTML += rendered;		
	};

	var getFullName = function(name){
		return templatesPath + '/' + name + '.' + templatesType;
	};

	var log = function(message, level){
		console.log('ElementGenerator - ' + level + ' - ' + message);
	}

	var asyncRequest = function(params){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if(this.readyState == 4){
				if(this.status == 200 && typeof params.success === 'function'){
					params.success(this.responseText);
				}else if((typeof params.error) === 'function'){
					params.error();
				} else {
					log('Unexpected error', Levels.ERROR);
				}
			} 
		};
		xhttp.open("GET", params.url, true);
		xhttp.send();
	};

	return {
		build : build
	}
});