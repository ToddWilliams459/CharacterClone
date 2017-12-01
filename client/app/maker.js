const handleDomo = (e) => {
	e.preventDefault();

	$("#domoMessage").animate({width:'hide'},350);

	if($("#domoName").val() == '' || $("#domoAge").val() == '') {
		handleError("RAWR! All fields are required");
		return false;
	}

	sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function(){
		loadDomosFromServer();
	});
	return false;
};

const DomoForm = (props) => {
	return (
		<form id="domoForm"
		onSubmit= {handleDomo}
		name="domoForm"
		action="/maker"
		method="POST"
		className="domoForm"
		>

		<label htmlFor="name">Name: </label>
		<input id="domoName" type="text" name="name" placeholder="Domo Name" />
		<label htmlFor="age"> Age: </label>
		<input id="domoAge" type="text" name="age" placeholder="Domo Age" />
		<label htmlFor="level">Level: </label>
		<input id="domoLevel" type="text" name="level" placeholder="Domo Level" />
		<input type="hidden" name="_csrf" value={props.csrf} />
		<input className="makeDomoSubmit" type="submit" value="Make Domo" />
		</form>
		);
};

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
				<img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
				<h3 className="domoName">Body Src: {domo.bodySrc} </h3>
				<h3 className="domoAge">Left Leg Src: {domo.leftLegSrc} </h3>
				<h3 className="domoLevel">Right leg Src: {domo.rightLegSrc} </h3>
				<h3 className="domoAge">Left Arm Src: {domo.leftArmSrc} </h3>
				<h3 className="domoLevel">Right Arm Src: {domo.rightArmSrc} </h3>
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
		<DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
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




