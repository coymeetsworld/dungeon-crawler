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
		maxhp: 150,
		str: 5,
		hp: 150,
		xp: 0,
		x: undefined,
		y: undefined
	}

	let defaultLevel = 1;
	let defaultMap = createDungeon(defaultCharacter, defaultLevel);
	
	let initialState = { dungeon: {map: defaultMap, level: defaultLevel, width: MAP_DIMENSIONS_COLUMNS, height: MAP_DIMENSIONS_ROWS, character: defaultCharacter, charLoc: {x: defaultCharacter.x, y: defaultCharacter.y}} };
	
	const store = createStore(reducer, initialState, compose(
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));
	
	return store;
}