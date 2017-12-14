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

const loadDomosFromServer = () => {
	sendAjax('GET', '/getCharacters', null, (data) => {
		ReactDOM.render(
			<DomoList characters={data.characters} />, document.querySelector("#domos")
		);
	});
};

const createAboutWindow = (props) => {
	ReactDOM.render(
		<div>
			<h1> About the creator </h1>
		</div>, document.querySelector('#content')
	);
};

const setup = function(csrf) {
	const aboutButton = document.querySelector("#about");
	const domoButton = document.querySelector("#domos");

	domoButton.addEventListener("click", (e) => {
		console.log(e);
		console.log(domoButton);
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




