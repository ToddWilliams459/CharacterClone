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
			React.createElement(
				"h3",
				{ className: "characterName" },
				"Body: ",
				domo.bodySrc,
				" "
			),
			React.createElement(
				"h3",
				{ className: "characterName" },
				"LeftLeg: ",
				domo.leftLegSrc,
				" "
			),
			React.createElement(
				"h3",
				{ className: "characterName" },
				"RightLeg: ",
				domo.rightLegSrc,
				" "
			),
			React.createElement(
				"h3",
				{ className: "characterName" },
				"LeftArm: ",
				domo.leftArmSrc,
				" "
			),
			React.createElement(
				"h3",
				{ className: "characterName" },
				"RightArm: ",
				domo.rightArmSrc,
				" "
			)
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
