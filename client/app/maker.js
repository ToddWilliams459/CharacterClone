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
				<img src={domo.bodySrc} alt ="Character Body"></img>
				<img src={domo.leftLegSrc} alt ="Character Left Leg"></img>
				<img src={domo.rightLegSrc} alt ="Character Right Leg"></img>
				<img src={domo.leftArmSrc} alt ="Character Left Arm"></img>
				<img src={domo.rightArmSrc} alt ="Character Right Arm"></img>
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
	
	//ReactDOM.render(
	//	<DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
	//);

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




