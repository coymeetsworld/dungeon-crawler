import {splitContainer, Container, random} from 'Container';
import { Room } from 'Room';
import * as MonsterCreator from 'MonsterCreator';
import * as HealthItemCreator from 'HealthItemCreator';
import * as WeaponCreator from 'WeaponCreator';

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
	
	let placeMedItem = (medItem, x, y) => {
		defaultMap[y][x] = {
			...defaultMap[y][x],
			containsPotion: true,
			potion: medItem
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


	let weapon = undefined;
	let monsters = [];
	let medItems = [];	
	
	switch(dungeonLevel) {
		case 1:
			weapon = WeaponCreator.createWoodClub();
			monsters.push(MonsterCreator.createSlime());	
			monsters.push(MonsterCreator.createSlime());	
			monsters.push(MonsterCreator.createSlime());	
			monsters.push(MonsterCreator.createSlime());	
			monsters.push(MonsterCreator.createGnome());	
			monsters.push(MonsterCreator.createGnome());	
			medItems.push(HealthItemCreator.createMedicalPack());
			break;
		case 2:
			weapon = WeaponCreator.createBattleAxe();
			monsters.push(MonsterCreator.createSlime());	
			monsters.push(MonsterCreator.createSlime());	
			monsters.push(MonsterCreator.createGnome());	
			monsters.push(MonsterCreator.createGnome());	
			monsters.push(MonsterCreator.createSkeleton());	
			monsters.push(MonsterCreator.createSkeleton());	
			medItems.push(HealthItemCreator.createMedicalPack());
			medItems.push(HealthItemCreator.createMedicalPack());
			medItems.push(HealthItemCreator.createMedicalPack());
			break;
		
		case 3:
			weapon = WeaponCreator.createSword();
			monsters.push(MonsterCreator.createImp());	
			monsters.push(MonsterCreator.createImp());	
			monsters.push(MonsterCreator.createImp());	
			monsters.push(MonsterCreator.createImp());	
			monsters.push(MonsterCreator.createOrc());	
			monsters.push(MonsterCreator.createOrc());	
			medItems.push(HealthItemCreator.createPotion());
			medItems.push(HealthItemCreator.createPotion());
			medItems.push(HealthItemCreator.createPotion());
			break;
			
		case 4:
			weapon = WeaponCreator.createLightningSword();
			monsters.push(MonsterCreator.createFireSkull());	
			monsters.push(MonsterCreator.createFireSkull());	
			monsters.push(MonsterCreator.createFireSkull());	
			monsters.push(MonsterCreator.createDragon());	
			medItems.push(HealthItemCreator.createPotion());
			medItems.push(HealthItemCreator.createPotion());
			medItems.push(HealthItemCreator.createPotion());
			medItems.push(HealthItemCreator.createPotion());
		
			break;
			
		default:
			console.log("Error, should not have gotten here! dungeonLevel=" + dungeonLevel);
	}


	//Place character at room 0
	defaultCharacter.x = Math.floor(rooms[0].center.x);
	defaultCharacter.y = Math.floor(rooms[0].center.y);
	placeCharacter(defaultCharacter, defaultCharacter.x, defaultCharacter.y);
	
	//Place end point spawn at last room
	placeEnd(Math.floor(rooms[rooms.length-1].center.x),Math.floor(rooms[rooms.length-1].center.y));
	
	let weaponRoomIndex = random(1, rooms.length-2); /* Not in beginning or end rooms */
	placeWeapon(weapon, Math.floor(rooms[weaponRoomIndex].center.x), Math.floor(rooms[weaponRoomIndex].center.y));

	while(monsters.length > 0) {
		let randIndex = random(1, rooms.length-2); //Not start or end point	
		let cx = random(rooms[randIndex].x, rooms[randIndex].x+rooms[randIndex].width-1);
		let cy = random(rooms[randIndex].y, rooms[randIndex].y+rooms[randIndex].height-1);
		placeMonster(monsters.shift(), cx, cy);
	}
	
	while(medItems.length > 0) {
		let randIndex = random(1, rooms.length-2); //Not start or end point	
		let cx = random(rooms[randIndex].x, rooms[randIndex].x+rooms[randIndex].width-1);
		let cy = random(rooms[randIndex].y, rooms[randIndex].y+rooms[randIndex].height-1);
		placeMedItem(medItems.shift(), cx, cy);
		
	}

	return defaultMap;
}