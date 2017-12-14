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
				"div",
				{ id: "characterBody" },
				React.createElement(
					"p",
					null,
					"Character Body "
				),
				React.createElement("img", { src: domo.bodySrc, alt: "Character Body" })
			),
			React.createElement(
				"div",
				{ id: "characterLL" },
				React.createElement(
					"p",
					null,
					" Character Left Leg "
				),
				React.createElement("img", { src: domo.leftLegSrc, alt: "Character Left Leg" })
			),
			React.createElement(
				"div",
				{ id: "characterRL" },
				React.createElement(
					"p",
					null,
					" Character Right Leg "
				),
				React.createElement("img", { src: domo.rightLegSrc, alt: "Character Right Leg" })
			),
			React.createElement(
				"div",
				{ id: "characterLA" },
				React.createElement(
					"p",
					null,
					" Character Left Arm "
				),
				React.createElement("img", { src: domo.leftArmSrc, alt: "Character Left Arm" })
			),
			React.createElement(
				"div",
				{ id: "characterRA" },
				React.createElement(
					"p",
					null,
					" Character Right Arm "
				),
				React.createElement("img", { src: domo.rightArmSrc, alt: "Character Right Arm" })
			)
		);
	});

	return React.createElement(
		"div",
		{ className: "domoList" },
		characterNodes
	);
};

var DomoSingle = function DomoSingle(props) {
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
				"div",
				{ id: "characterBody" },
				React.createElement(
					"p",
					null,
					"Character Body "
				),
				React.createElement("img", { src: domo.bodySrc, alt: "Character Body" })
			),
			React.createElement(
				"div",
				{ id: "characterLL" },
				React.createElement(
					"p",
					null,
					" Character Left Leg "
				),
				React.createElement("img", { src: domo.leftLegSrc, alt: "Character Left Leg" })
			),
			React.createElement(
				"div",
				{ id: "characterRL" },
				React.createElement(
					"p",
					null,
					" Character Right Leg "
				),
				React.createElement("img", { src: domo.rightLegSrc, alt: "Character Right Leg" })
			),
			React.createElement(
				"div",
				{ id: "characterLA" },
				React.createElement(
					"p",
					null,
					" Character Left Arm "
				),
				React.createElement("img", { src: domo.leftArmSrc, alt: "Character Left Arm" })
			),
			React.createElement(
				"div",
				{ id: "characterRA" },
				React.createElement(
					"p",
					null,
					" Character Right Arm "
				),
				React.createElement("img", { src: domo.rightArmSrc, alt: "Character Right Arm" })
			)
		);
	});

	return React.createElement(
		"div",
		{ className: "domoList" },
		characterNodes[0]
	);
};

var loadDomosFromServer = function loadDomosFromServer() {
	sendAjax('GET', '/getCharacters', null, function (data) {
		ReactDOM.render(React.createElement(DomoList, { characters: data.characters }), document.querySelector("#domos"));

		//ReactDOM.render(
		//	<DomoSingle characters={data.characters} />,document.querySelector("#test")
		//);
	});
};

var createAboutWindow = function createAboutWindow(props) {
	ReactDOM.render(React.createElement(
		"div",
		null,
		React.createElement(
			"h1",
			null,
			" About the creator "
		)
	), document.querySelector('#content'));
};

var onSubTest = function onSubTest(e) {
	console.log('submitted');
};

var ChangeWindow = function ChangeWindow(props) {
	return React.createElement(
		"form",
		{ id: "signupForm",
			name: "signupForm",
			onSubmit: onSubTest,
			action: "/signup",
			method: "POST",
			className: "mainForm"
		},
		React.createElement(
			"label",
			{ htmlFor: "pass" },
			"Password: "
		),
		React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
		React.createElement(
			"label",
			{ htmlFor: "pass2" },
			"Password: "
		),
		React.createElement("input", { id: "pass2", type: "passwprd", name: "pass2", placeholder: "retype password" }),
		React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
		React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign Up" })
	);
};

var createChangeWindow = function createChangeWindow(csrf) {
	ReactDOM.render(React.createElement(ChangeWindow, { csrf: csrf }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
	var aboutButton = document.querySelector("#about");
	var domoButton = document.querySelector("#myCharPage");
	var changeButton = document.querySelector("#changeButton");

	changeButton.addEventListener("click", function (e) {
		e.preventDefault();
		createChangeWindow(csrf);
	});

	domoButton.addEventListener("click", function (e) {
		sendAjax('GET', '/getCharacters', null, function (data) {
			ReactDOM.render(React.createElement(DomoSingle, { characters: data.characters }), document.querySelector("#content"));
		});
	});

	aboutButton.addEventListener("click", function (e) {
		e.preventDefault();
		ReactDOM.render(React.createElement(
			"div",
			null,
			React.createElement(
				"h1",
				null,
				"About the Developer"
			),
			React.createElement("img", { src: "/assets/todd.jpg", alt: "todd pic", height: "175", width: "125" }),
			React.createElement(
				"p",
				null,
				"Todd Williams is a New Media Development student at the Rochester Insitute of Technology. "
			)
		), document.querySelector("#content"));
	});

	ReactDOM.render(React.createElement(
		"div",
		null,
		React.createElement(
			"button",
			{ id: "bodyButton", onClick: click },
			" Change Body "
		),
		React.createElement(
			"button",
			{ id: "rightArmButton", onClick: click2 },
			" Change Legs "
		),
		React.createElement(
			"button",
			{ id: "leftArmButton", onClick: click3 },
			" Change Arms "
		)
	), document.getElementById('area'));

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
