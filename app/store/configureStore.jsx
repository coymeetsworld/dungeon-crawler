import { combineReducers, createStore, compose } from 'redux';
import { dungeonMapReducer, characterReducer} from 'reducers';
import {splitContainer, Container, random} from 'Container';
import {Room} from 'Room';

const MAP_DIMENSIONS_COLUMNS = 50;
const MAP_DIMENSIONS_ROWS = 25;
const ITERATIONS = 3; // Number used to determine how many containers will get created.


export var configure = () => {
	
	
	const reducer = combineReducers({
		dungeon: dungeonMapReducer
	});
	
	let placeWeapon = (weapon, x, y) => {
		defaultMap[y][x] = {
			...defaultMap[y][x],
			containsWeapon: true,
			weapon: weapon
		}
	}	
	
	// Removes the walls from the room
	let renderRoom = (room) => {
		for (let y = room.y; y < room.y+room.height; y++) {
			for (let x = room.x; x < room.x+room.width; x++) {
				defaultMap[y][x] = {
					...defaultMap[y][x],
					isWall: false
				}
			}
		}	
	}
	
	let placePotion = (potion, x, y) => {
		defaultMap[y][x] = {
			...defaultMap[y][x],
			containsPotion: true,
			potion: potion
		}
	}
	
	let placeMonster = (monster, x, y) => {
		defaultMap[y][x] = {
			...defaultMap[y][x],
			containsMonster: true,
			monster: monster
		}
	}
	
	let placeCharacter = (character, x, y) => {
		defaultMap[y][x] = {
			...defaultMap[y][x],
			containsCharacter: true,
		}
	}
	
	let placeEnd = (x, y) => {
		defaultMap[y][x] = {
			...defaultMap[y][x],
			isExit: true
		}
	}
	
	let defaultMap = [MAP_DIMENSIONS_COLUMNS];
	
	for (let i = 0; i < MAP_DIMENSIONS_ROWS; i++) {
		defaultMap[i] = [];
		for (let j = 0; j < MAP_DIMENSIONS_COLUMNS; j++) {
			defaultMap[i].push({
				containsCharacter: false,
				containsMonster: false,
				containsWeapon: false,
				containsPotion: false,
				isExit: false,
				isWall: true
			});
		}
	}


	let renderPath = (lContainer, rContainer) => {
		
		let p1x = Math.floor(lContainer.center.x);
		let p1y = Math.floor(lContainer.center.y);

		let p2x = Math.floor(rContainer.center.x);
		let p2y = Math.floor(rContainer.center.y);
		
		if (p1y === p2y) {
			for (let x = p1x; x < p2x; x++) {
				defaultMap[p1y][x] = {
					...defaultMap[p1y][x],
					isWall: false	
				}
			}
		} else if (p1x === p2x) {
			for (let y = p1y; y < p2y; y++) {
				defaultMap[y][p1x] = {
					...defaultMap[y][p1x],
					isWall: false	
				}
			}
		}
	}
	
	let renderPaths = (tree) => {
		if (tree.leftChild !== undefined && tree.rightChild !== undefined) {
			renderPath(tree.leftChild.leaf, tree.rightChild.leaf);
			renderPaths(tree.leftChild);
			renderPaths(tree.rightChild);
		}
	}


	//Create dungeon rooms
																//x,y,width,height
	let container = new Container(0,0,MAP_DIMENSIONS_COLUMNS,MAP_DIMENSIONS_ROWS);	
	let containerTree = splitContainer(container, ITERATIONS); //returns a BSPTree
	renderPaths(containerTree);
	
	let leaves = containerTree.getLeaves();
	let rooms = leaves.map((leaf) => {
		return new Room(leaf);		
	});
	rooms.map((room)=> renderRoom(room));


	//Faro, Jin
	let defaultCharacter = {
		name: 'Trey',
		weapon: undefined,
		level: 1,
		maxhp: 125,
		str: 15,
		hp: 125,
		xp: 0
	}
	
	//Let's put character in root of tree.	

	let charX, charY;
	let weaponRoomIndex = random(1, rooms.length-2); /* Not in beginning or end rooms */
	
	let weapon = {
		name: 'Dagger',
		attack: 15
	}
	
	rooms.map((room, roomIndex) => {
		
		let centerX = Math.floor(room.center.x);
		let centerY = Math.floor(room.center.y);
			
		if (roomIndex === 0) {
			//character spawn point
			charX = centerX;
			charY = centerY;
			placeCharacter(defaultCharacter, charX, charY);
		}	else if (roomIndex === rooms.length-1) {
			//end point spawn
			placeEnd(centerX, centerY);
		} else if (roomIndex === weaponRoomIndex) {
			placeWeapon(weapon, centerX, centerY);
		}
		else {
			//Between the beginning and end rooms, need a mix of monsters and potions
			//Well make it 50/50 for now to make it easy
			if (Math.round(Math.random())) {
				let monster = {
					hp: 25,
					strength: 35,
					level: 1,
					xp: 10 /* derive xp later based on stats of monster, for now simplify it by giving it as an attribute. */
				}
				placeMonster(monster, centerX, centerY);
			} else {
				let potion = {
					name: 'Potion',
					restoreAmount: 20
				}
				placePotion(potion, centerX, centerY);
			}
		}
		
	});	


	//xp to level should be constant and function defined elsewhere
	/*weapons an object with strength parameter?
	const weapons = {
		'dagger': 10,
		'club', 20,
		'sword': 40,
		'2h sword': 55
	}
	*/
	
	let initialState = { dungeon: {map: defaultMap, width: MAP_DIMENSIONS_COLUMNS, height: MAP_DIMENSIONS_ROWS, character: defaultCharacter, charLoc: {x: charX, y: charY}} };
	
	const store = createStore(reducer, initialState, compose(
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));
	
	return store;
}