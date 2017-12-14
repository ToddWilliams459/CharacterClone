const DomoList = function(props) {
	if(props.characters.length === 0) {
		return (
		<div className="domoList">
			<h3 className="emptyDomo"> No Characters yet </h3>
		</div>
		);
	}

	const characterNodes = props.characters.map(function(domo) {
		return (
			<div key={domo._id} className="domo">
				<div id="characterBody">
					<p>Character Body </p>
					<img  src={domo.bodySrc} alt ="Character Body"></img>
				</div>
				<div id="characterLL">
					<p> Character Left Leg </p>
					<img  src={domo.leftLegSrc} alt ="Character Left Leg"></img>
				</div>
				<div id="characterRL">
					<p> Character Right Leg </p>
					<img  src={domo.rightLegSrc} alt ="Character Right Leg"></img>

				</div>
				<div id="characterLA">
					<p> Character Left Arm </p>
					<img  src={domo.leftArmSrc} alt ="Character Left Arm"></img>

				</div>
				<div id="characterRA">
					<p> Character Right Arm </p>
					<img  src={domo.rightArmSrc} alt ="Character Right Arm"></img>
				</div>												
			</div>
			);
	});

	return (
		<div className="domoList">
		{characterNodes}
		</div>
	);
};

const DomoSingle = function(props) {
	if(props.characters.length === 0) {
		return (
		<div className="domoList">
			<h3 className="emptyDomo"> No Characters yet </h3>
		</div>
		);
	}

	const characterNodes = props.characters.map(function(domo) {
		return (
			<div key={domo._id} className="domo">
				<div id="characterBody">
					<p>Character Body </p>
					<img  src={domo.bodySrc} alt ="Character Body"></img>
				</div>
				<div id="characterLL">
					<p> Character Left Leg </p>
					<img  src={domo.leftLegSrc} alt ="Character Left Leg"></img>
				</div>
				<div id="characterRL">
					<p> Character Right Leg </p>
					<img  src={domo.rightLegSrc} alt ="Character Right Leg"></img>

				</div>
				<div id="characterLA">
					<p> Character Left Arm </p>
					<img  src={domo.leftArmSrc} alt ="Character Left Arm"></img>

				</div>
				<div id="characterRA">
					<p> Character Right Arm </p>
					<img  src={domo.rightArmSrc} alt ="Character Right Arm"></img>
				</div>												
			</div>
			);
	});

	return (
		<div className="domoList">
		{characterNodes[0]}
		</div>
	);
};

const loadDomosFromServer = () => {
	sendAjax('GET', '/getCharacters', null, (data) => {
		ReactDOM.render(
			<DomoList characters={data.characters} />, document.querySelector("#domos")
		);

		//ReactDOM.render(
		//	<DomoSingle characters={data.characters} />,document.querySelector("#test")
		//);
	});
};

const createAboutWindow = (props) => {
	ReactDOM.render(
		<div>
			<h1> About the creator </h1>
		</div>, document.querySelector('#content')
	);
};


const onSubTest = (e) => {
	console.log('submitted');
};

const ChangeWindow = (props) => {
	return (
		<form id="signupForm"
			name="signupForm"
			onSubmit={onSubTest}
			action="/signup"
			method="POST"
			className="mainForm"
		>

		<label htmlFor="pass">Password: </label>
		<input id="pass" type="password" name="pass" placeholder="password"/>
		<label htmlFor="pass2">Password: </label>
		<input id="pass2" type="passwprd" name="pass2" placeholder="retype password"/>
		<input type="hidden" name="_csrf" value={props.csrf} />
		<input className="formSubmit" type="submit" value="Sign Up" />
		</form>
	);
};

const createChangeWindow = (csrf) => {
	ReactDOM.render(
		<ChangeWindow csrf={csrf} />,
		document.querySelector("#content")
		);
};

const setup = function(csrf) {
	const aboutButton = document.querySelector("#about");
	const domoButton = document.querySelector("#myCharPage");
	const changeButton = document.querySelector("#changeButton");


	changeButton.addEventListener("click", (e) => {
		e.preventDefault();
		createChangeWindow(csrf);
	});

	domoButton.addEventListener("click", (e) => {
		sendAjax('GET', '/getCharacters', null, (data) => {
		ReactDOM.render(
			<DomoSingle characters={data.characters} />,document.querySelector("#content")
		);
	});
	});

	aboutButton.addEventListener("click", (e) => {
		e.preventDefault();
		ReactDOM.render(
			<div>
				<h1>About the Developer</h1>
				<img src="/assets/todd.jpg" alt="todd pic" height="175" width="125"></img>
				<p>Todd Williams is a New Media Development student at the Rochester Insitute of Technology. </p>
			</div>,document.querySelector("#content")
		);
	});

	ReactDOM.render(
	<div>
		<button id="bodyButton" onClick={click}> Change Body </button>
		<button id="rightArmButton" onClick={click2}> Change Legs </button>
 		<button id="leftArmButton" onClick={click3}> Change Arms </button>
	</div>,document.getElementById('area')
	);

	ReactDOM.render(
		<DomoList characters={[]} />, document.querySelector("#domos")
	);

	loadDomosFromServer();
};

const getToken = () => {
	sendAjax('GET', '/getToken', null, (result) => {
		setup(result.csrfToken);
	});
};


$(document).ready(function() {
	getToken();
});




