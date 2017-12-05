"use strict";

var DomoList = function DomoList(props) {
	if (props.characters.length === 0) {
		return React.createElement(
			"div",
			{ className: "domoList" },
			React.createElement(
				"h3",
				{ className: "emptyDomo" },
				" No Characters yet "
			)
		);
	}

	var characterNodes = props.characters.map(function (domo) {
		return React.createElement(
			"div",
			{ key: domo._id, className: "domo" },
			React.createElement("img", { src: domo.bodySrc, alt: "Character Body" }),
			React.createElement("img", { src: domo.leftLegSrc, alt: "Character Left Leg" }),
			React.createElement("img", { src: domo.rightLegSrc, alt: "Character Right Leg" }),
			React.createElement("img", { src: domo.leftArmSrc, alt: "Character Left Arm" }),
			React.createElement("img", { src: domo.rightArmSrc, alt: "Character Right Arm" })
		);
	});

	return React.createElement(
		"div",
		{ className: "domoList" },
		characterNodes
	);
};

var loadDomosFromServer = function loadDomosFromServer() {
	sendAjax('GET', '/getCharacters', null, function (data) {
		ReactDOM.render(React.createElement(DomoList, { characters: data.characters }), document.querySelector("#domos"));
	});
};

var setup = function setup(csrf) {

	//ReactDOM.render(
	//	<DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
	//);

	ReactDOM.render(React.createElement(DomoList, { characters: [] }), document.querySelector("#domos"));

	loadDomosFromServer();
};

var getToken = function getToken() {
	sendAjax('GET', '/getToken', null, function (result) {
		setup(result.csrfToken);
	});
};

$(document).ready(function () {
	getToken();
});
"use strict";

var handleError = function handleError(message) {
	$("#errorMessage").text(message);
	$("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
	$("#domoMessage").animate({ width: 'hide' }, 350);
	window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
	$.ajax({
		cache: false,
		type: type,
		url: action,
		data: data,
		dataType: "json",
		success: success,
		error: function error(xhr, status, _error) {
			var messageObj = JSON.parse(xhr.responseText);
			handleError(messageObj.error);
		}
	});
};
