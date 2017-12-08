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

const setup = function(csrf) {
	
	ReactDOM.render(
	//	<DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
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




