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
				<h3 className="characterName">Body: {domo.bodySrc} </h3>
				<h3 className="characterName">LeftLeg: {domo.leftLegSrc} </h3>
				<h3 className="characterName">RightLeg: {domo.rightLegSrc} </h3>
				<h3 className="characterName">LeftArm: {domo.leftArmSrc} </h3>
				<h3 className="characterName">RightArm: {domo.rightArmSrc} </h3>
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




