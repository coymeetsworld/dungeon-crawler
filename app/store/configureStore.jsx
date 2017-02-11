import { combineReducers, createStore, compose } from 'redux';
import { dungeonMapReducer, characterReducer} from 'reducers';

const MAP_DIMENSIONS_COLUMNS = 20;
const MAP_DIMENSIONS_ROWS = 15;

export var configure = () => {
	
	const reducer = combineReducers({
		dungeon: dungeonMapReducer,
		character: characterReducer
	});
	
	let defaultMap = [MAP_DIMENSIONS_COLUMNS];
	
	for (let i = 0; i < MAP_DIMENSIONS_ROWS; i++) {
		defaultMap[i] = [];
		for (let j = 0; j < MAP_DIMENSIONS_COLUMNS; j++) {
			defaultMap[i].push({
				containsCharacter: false,
				containsMonster: false	
			});
		}
	}

	defaultMap[5][7] = {
		containsCharacter: true,
		containsMonster: false
	}
	
	//Faro, Jin
	let defaultCharacter = {
		name: 'Trey',
		weapon: undefined,
		level: 1,
		maxhp: 25,
		hp: 25,
		xp: 0
	}
	//xp to level should be constant and function defined elsewhere
	/*weapons an object with strength parameter?
	const weapons = {
		'dagger': 10,
		'club', 20,
		'sword': 40,
		'2h sword': 55
	}
	*/
	
	//console.log(defaultMap);
	
	let initialState = { dungeon: {map: defaultMap, width: MAP_DIMENSIONS_COLUMNS, height: MAP_DIMENSIONS_ROWS }, character: defaultCharacter};
	
	const store = createStore(reducer, initialState, compose(
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));
	
	return store;
}