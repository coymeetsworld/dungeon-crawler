import { combineReducers, createStore, compose } from 'redux';
import { dungeonMapReducer } from 'reducers';
import { createDungeon, MAP_DIMENSIONS_COLUMNS, MAP_DIMENSIONS_ROWS } from 'DungeonCreator';
import { createCharacter } from 'CharacterCreator';



export let configure = () => {
	
	
	const reducer = combineReducers({
		dungeon: dungeonMapReducer
	});


	let defaultCharacter = createCharacter();
	let defaultDungeonLevel = 1;
	let defaultMap = createDungeon(defaultCharacter, defaultDungeonLevel);
	
	let initialState = { dungeon: {map: defaultMap, 
																 level: defaultDungeonLevel,
																 width: MAP_DIMENSIONS_COLUMNS,
																 height: MAP_DIMENSIONS_ROWS,
																 character: defaultCharacter, 
																 charLoc: {x: defaultCharacter.x, y: defaultCharacter.y}, 
																 endCondition: null,
																 godView: false }};
	
	const store = createStore(reducer, initialState, compose(
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));
	
	return store;
}