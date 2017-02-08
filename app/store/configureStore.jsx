import { combineReducers, createStore, compose } from 'redux';

export var configure = () => {
	
	const reducer = () => {};
	//const reducer = combineReducers({});
	
	const initialState = {};
	
	const store = createStore(reducer, initialState, compose(
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));
	
	return store;
}