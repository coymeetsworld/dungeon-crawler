import { combineReducers, createStore, compose } from 'redux';
import { dungeonMapReducer } from 'reducers';

const MAP_DIMENSIONS_X = 15;
const MAP_DIMENSIONS_Y = 30;

export var configure = () => {
	
	const reducer = combineReducers({
		dungeonMap: dungeonMapReducer
	});
	
	let defaultMap = new Array(MAP_DIMENSIONS_X);
	for (let i = 0; i < MAP_DIMENSIONS_X; i++) {
		defaultMap[i] = new Array(MAP_DIMENSIONS_Y);
		for (let j = 0; j < MAP_DIMENSIONS_Y; j++) {
			defaultMap[i][j] = {
				
			}
		}
	}
	
	let initialState = { dungeonMap: defaultMap };
	
	const store = createStore(reducer, initialState, compose(
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));
	
	return store;
}