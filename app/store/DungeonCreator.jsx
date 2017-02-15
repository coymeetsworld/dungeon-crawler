import {splitContainer, Container, random} from 'Container';
import { Room } from 'Room';

export const MAP_DIMENSIONS_COLUMNS = 50;
export const MAP_DIMENSIONS_ROWS = 25;
const ITERATIONS = 3; // Number used to determine how many containers will get created.

export let createDungeon = (defaultCharacter, dungeonLevel) => {
	
	// Removes the walls (i.e. creates pathways between two containers). TODO maybe should be rooms instead of containers. Had a bug where a path was closed off from everything.
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
	
	//Creates paths between rooms.
	let renderPaths = (tree) => {
		if (tree.leftChild !== undefined && tree.rightChild !== undefined) {
			renderPath(tree.leftChild.leaf, tree.rightChild.leaf);
			renderPaths(tree.leftChild);
			renderPaths(tree.rightChild);
		}
	}

	// Removes the walls and creates the room
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

	let placeWeapon = (weapon, x, y) => {
		defaultMap[y][x] = {
			...defaultMap[y][x],
			containsWeapon: true,
			weapon: weapon
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
	
	
	
	// Create default map initializing each element as a tile with nothing in it as a wall.
	//Paths and rooms will be carved out next and then items/weapons/monsters/character/exit will be added afterwards.
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

	
	//At this point rooms and paths are created. Now need to populate rooms with characters, weapons, items, monsters, and an exit.
	//+ Character will be in the first room (i.e. root of the tree).
	//+ Exit will be in the last room.
	//+ A single weapon will be found in one room where there isn't an exit or character start point.
	//+ The rest of the rooms will have monsters and potions. Until gameplay is ironed out, each room will contain either a potion or a monster and its 50/50


	
	//Let's put character in root of tree.	

	let weaponRoomIndex = random(1, rooms.length-2); /* Not in beginning or end rooms */
	let weapon = {
		name: 'Dagger',
		attack: 15
	}
	
	let monster = {
		hp: 25,
		strength: 35,
		level: 1,
		xp: 10 /* derive xp later based on stats of monster, for now simplify it by giving it an attribute. */
	}

	let potion = {
		name: 'Potion',
		restoreAmount: 20
	}

	rooms.map((room, roomIndex) => {
		
		let centerX = Math.floor(room.center.x);
		let centerY = Math.floor(room.center.y);
			
		if (roomIndex === 0) {
			//Character spawn point
			defaultCharacter.x = centerX;
			defaultCharacter.y = centerY;
			placeCharacter(defaultCharacter, defaultCharacter.x, defaultCharacter.y);
		}	else if (roomIndex === rooms.length-1) {
			//end point spawn
			placeEnd(centerX, centerY);
		} else if (roomIndex === weaponRoomIndex) {
			placeWeapon(weapon, centerX, centerY);
		}
		else {
			if (Math.round(Math.random())) {
				placeMonster(monster, centerX, centerY);
			} else {
				placePotion(potion, centerX, centerY);
			}
		}
	});	

	return defaultMap;
}