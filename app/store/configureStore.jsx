import { combineReducers, createStore, compose } from 'redux';
import { dungeonMapReducer } from 'reducers';
import { createDungeon, MAP_DIMENSIONS_COLUMNS, MAP_DIMENSIONS_ROWS } from 'DungeonCreator';



export let configure = () => {
	
	
	const reducer = combineReducers({
		dungeon: dungeonMapReducer
	});


	//Faro, Jin
	let defaultCharacter = {
		name: 'Trey',
		weapon: undefined,
		level: 1,
		maxhp: 125,
		str: 15,
		hp: 125,
		xp: 0,
		x: undefined,
		y: undefined
	}

	let defaultLevel = 1;
	let defaultMap = createDungeon(defaultCharacter, defaultLevel);
	



	//xp to level should be constant and function defined elsewhere
	/*weapons an object with strength parameter?
	const weapons = {
		'dagger': 10,
		'club', 20,
		'sword': 40,
		'2h sword': 55
	}
	*/
	
	let initialState = { dungeon: {map: defaultMap, level: defaultLevel, width: MAP_DIMENSIONS_COLUMNS, height: MAP_DIMENSIONS_ROWS, character: defaultCharacter, charLoc: {x: defaultCharacter.x, y: defaultCharacter.y}} };
	
	const store = createStore(reducer, initialState, compose(
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));
	
	return store;
}