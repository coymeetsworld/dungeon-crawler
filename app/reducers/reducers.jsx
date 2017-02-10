export const dungeonMapReducer = (state = {}, action) => {

	switch (action.type) {
		default:
			return state;
	}
}

export const characterReducer = (state = {}, action) => {

	switch (action.type) {
		case 'SET_LOCATION': 
			console.log("Set loc called");
			return state;
		default:
			return state;
	}
}