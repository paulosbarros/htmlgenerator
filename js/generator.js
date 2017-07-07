var ElementGenerator = (function(){
	var elementsPath = "Elements/"
	var type = ".html";
	var outputIdTemp;
	var dataTemp;
	var templateTemp;
	
	var loadTemplateOnDiv = function (name, data, outputId) {
		outputIdTemp = outputId;
		dataTemp = data;
		$.ajax({
			url : getFullName(name)
		}).done(
			function(template){
				templateTemp = template;
				renderTemplateOnDiv();
			}
		);		
	};

	var renderTemplateOnDiv = function () {
		var rendered = Mustache.render(templateTemp, dataTemp);
		$('#'+outputIdTemp).append(rendered);		
	};
	
	var returnRenderedTemplate = function () {
		return Mustache.render(templateTemp, dataTemp);
	};
	
	var getRenderedTemplate = function (name, data) {
		dataTemp = data;
		$.ajax({
			type : 'GET',
			url : getFullName(name)
		}).done(
			function(template){
				templateTemp = template;
				returnRenderedTemplate();
			}
		);
	};
	
	var getFullName = function(name){
		return elementsPath + name + type;
	};
	
	var clearTemp = function () {
		outputIdTemp = '';
		dataTemp = '';
		templateTemp = '';
	}

	return {
		loadTemplateOnDiv : loadTemplateOnDiv,
		getRenderedTemplate : getRenderedTemplate
	}
})();

ElementGenerator.loadTemplateOnDiv('Kanban-Column', {id:123,content:'teste'}, 'output-div');

var element = ElementGenerator.getRenderedTemplate('Kanban-Column',{id:456,content:'elemento interno'});
console.log(element);

ElementGenerator.loadTemplateOnDiv('Kanban-Column', {id:789,content:element}, 'output-div');