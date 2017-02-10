import { combineReducers, createStore, compose } from 'redux';
import { dungeonMapReducer } from 'reducers';

const MAP_DIMENSIONS_X = 30;
const MAP_DIMENSIONS_Y = 50;

export var configure = () => {
	
	const reducer = combineReducers({
		dungeon: dungeonMapReducer
	});
	
	let defaultMap = [MAP_DIMENSIONS_X];
	
	for (let i = 0; i < MAP_DIMENSIONS_X; i++) {
		defaultMap[i] = [MAP_DIMENSIONS_Y];
		for (let j = 0; j < MAP_DIMENSIONS_Y; j++) {
			defaultMap[i].push({
				containsMonster: false	
			});
		}
	}
	
	
	//console.log(defaultMap);
	
	let initialState = { dungeon: {map: defaultMap, width: MAP_DIMENSIONS_X, height: MAP_DIMENSIONS_Y }};
	
	const store = createStore(reducer, initialState, compose(
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));
	
	return store;
}