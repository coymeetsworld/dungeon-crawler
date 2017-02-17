import {createDungeon} from 'DungeonCreator';

export const dungeonMapReducer = (state = {}, action) => {

	let characterMove = (state, direction) => {
		
		let dungeonMap = state.map;
		let mapWidth = state.width;
		let mapHeight = state.height;
		let charX = state.charLoc.x;
		let charY = state.charLoc.y;
		let character = state.character;
		let playerWin = null;
		let playerLose = null;
		
		if (state.endCondition) {
			//At this point game was over and user pushed a key, indicating they would like to start the game over.
				
		}
		

		let newDungeonMap = undefined;
		let newCharLoc = state.charLoc; // Keep the same unless character actually moves.

		// If character is going on a tile with a weapon, remove it from the map (it will get added to character in another reducer.)
		let checkForWeapon = (cell, x, y) => {
			if (dungeonMap[y][x].containsWeapon) {
				cell = {
					...cell,
					containsWeapon: false,
					weapon: null
				}
				character = {
					...character,
					weapon: dungeonMap[y][x].weapon	
				}
			}	
			return cell;
		}
		
		let checkForPotion = (cell, x, y) => {
			if (dungeonMap[y][x].containsPotion) {
				let potion = dungeonMap[y][x].potion;	
				cell = {
					...cell,
					containsPotion: false,
					potion: null
				}
				character = {
					...character,
					hp: (character.hp + potion.restoreAmount > character.maxhp ? character.maxhp : character.hp + potion.restoreAmount)
				}
			}
			return cell;	
		}
		
		
		let fightMonster = (cell) => {
			
			let charStrength = character.str;
			let monster = cell.monster;
			if (character.weapon) { charStrength += character.weapon.attack; }					
			let monsterHP = monster.hp - charStrength;
			let charHP = character.hp - monster.str;
			
			if (charHP <= 0) {
				charHP = 0;
				console.log("GAME OVER! Character is dead!");
				playerLose = true;
			}
			character = {					
				...character,
				hp: charHP	
			}
			
			if (monsterHP <= 0) {
				
				if(monster.name === 'dragon') {
					console.log("You win!!!!");
					playerWin = true;
				}
				
				character = {
					...character,
					xp: character.xp + monster.xp
				}
				
				if (character.level === 1 && character.xp >= 40) {
					character = {
						...character,
						level: 2,
						maxhp: 200,
						str: 10,
					}	
				} else if (character.level === 2 && character.xp >= 80) {
					character = {
						...character,
						level: 3,
						maxhp: 350,
						str: 20,
					}
				} else if (character.level === 3 && character.xp >= 320) {
					character = {
						...character,
						level: 4,
						maxhp: 700,
						str: 35,
					}
				} else if (character.level === 4 && character.xp >= 550) {
					character = {
						...character,
						level: 5,
						maxhp: 1000,
						str: 65,
					}
				}
				
				return {
					...cell,
					containsMonster: false,
					monster: null
				}	
			}			
			
			return {
				...cell,
				monster: {
					...monster,
					hp: monsterHP
				}
			}
		}

		let rescanMap = (prev, next) => {
			
			return dungeonMap.map((row, rIndex) => {					
				return row.map((col, cIndex) => {	
						
					// Looking ahead, to see if there's a monster.
					// This is called first because if a monster is encountered, faught and dies. The character will move to his spot.
					if (cIndex === next.x && rIndex === next.y) {
						if (dungeonMap[next.y][next.x].containsMonster) { 	
							return fightMonster(dungeonMap[next.y][next.x]);
						}
					}	

					if (cIndex === prev.x && rIndex === prev.y) {
						if (dungeonMap[next.y][next.x].containsMonster) { return col; } 
						return {
							...dungeonMap[rIndex][cIndex],
							containsCharacter: false,
						}
					} else if (cIndex === next.x && rIndex === next.y) {
						if (dungeonMap[next.y][next.x].containsMonster) { return col; } 
						let cell = {
							...dungeonMap[rIndex][cIndex],
							containsCharacter: true,
						}
						cell = checkForWeapon(cell, cIndex, rIndex);
						cell = checkForPotion(cell, cIndex, rIndex);
						newCharLoc = {x: cIndex, y: rIndex};	
						
						return cell;
					}
					return col;
				});
			});
		}


		let generateLevel = (level) => {
			
			console.log(state);
			console.log(level);
			let nextMap = createDungeon(character, level);
			
			return {
				...state,
				map: nextMap,
				level,
				character, /* components changed in createDungeon, has x and y */
				charLoc: {x: character.x, y: character.y}
			}
			
		}
		
		
		switch(direction) {
			case 'LEFT':
				if (charX-1 >= 0 && !dungeonMap[charY][charX-1].isWall) {
					if (dungeonMap[charY][charX-1].isExit) {
						console.log("Character going through exit" + state.level);
						return generateLevel(state.level+1);
					}
					newDungeonMap = rescanMap({x: charX, y: charY}, {x: charX-1, y: charY});
					
					let endCondition = state.endCondition;
					if (playerWin) {							
						endCondition = "WIN";
					} else if (playerLose) {
						endCondition = "LOSE";
					}
					
					return {
						...state,
						map: newDungeonMap,
						character,
						charLoc: newCharLoc,
						endCondition
					}
				}
				break;

			case 'RIGHT':
				if (charX+1 < mapWidth && !dungeonMap[charY][charX+1].isWall) {
					if (dungeonMap[charY][charX+1].isExit) {
						console.log("Character going through exit");
						return generateLevel(state.level+1);
					}
					newDungeonMap = rescanMap({x: charX, y: charY}, {x: charX+1, y: charY});

					let endCondition = state.endCondition;
					if (playerWin) {							
						endCondition = "WIN";
					} else if (playerLose) {
						endCondition = "LOSE";
					}

					return {
						...state,
						map: newDungeonMap,
						character,
						charLoc: newCharLoc,
						endCondition
					}
				}
				break;

			case 'UP':
				if (charY-1 >= 0 && !dungeonMap[charY-1][charX].isWall) {
					if (dungeonMap[charY-1][charX].isExit) {
						console.log("Character going through exit");
						return generateLevel(state.level+1);
					}
					newDungeonMap = rescanMap({x: charX, y: charY}, {x: charX, y: charY-1});

					let endCondition = state.endCondition;
					if (playerWin) {							
						endCondition = "WIN";
					} else if (playerLose) {
						endCondition = "LOSE";
					}
					
					return {
						...state,
						map: newDungeonMap,
						character,
						charLoc: newCharLoc,
						endCondition
					}
				}
				break;

			case 'DOWN':
				if (charY+1 < mapHeight && !dungeonMap[charY+1][charX].isWall) {
					if (dungeonMap[charY+1][charX].isExit) {
						console.log("Character going through exit");
						return generateLevel(state.level+1);
					}
					newDungeonMap = rescanMap({x: charX, y: charY}, {x: charX, y: charY+1});

					let endCondition = state.endCondition;
					if (playerWin) {							
						endCondition = "WIN";
					} else if (playerLose) {
						endCondition = "LOSE";
					}
					
					return {
						...state,
						map: newDungeonMap,
						character,
						charLoc: newCharLoc,
						endCondition
					}
				}
				break;
		}

		return state;
	}


	switch (action.type) {
		case 'CHARACTER_MOVE': 
			return characterMove(state, action.direction);
		default:
			return state;
	}
}
