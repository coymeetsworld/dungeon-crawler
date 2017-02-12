export const dungeonMapReducer = (state = {}, action) => {

	let characterMove = (state, direction) => {
		let dungeonMap = state.map;
		let mapWidth = state.width;
		let mapHeight = state.height;
		let charX, charY;

		for (let i = 0; i < dungeonMap.length; i++) {
			for (let j = 0; j < dungeonMap[i].length; j++) {
				if (dungeonMap[i][j].containsCharacter) {
					//console.log("found character at " + i + " " + j);
					charX = j;
					charY = i;
					i = dungeonMap.length; // to stop iterating once found character. Any real significant boost?
					break;
				}
			}
		}

		let newDungeonMap = undefined;

		// If character is going on a tile with a weapon, remove it from the map (it will get added to character in another reducer.)
		let checkForWeapon = (cell, x, y) => {
			if (dungeonMap[y][x].containsWeapon) {					
				cell = {
					...cell,
					containsWeapon: false,
					weapon: null
				}
			}	
			return cell;
		}

		let rescanMap = (prev, next) => {
			
			return dungeonMap.map((row, rIndex) => {					
				return row.map((col, cIndex) => {						
					if (cIndex === prev.x && rIndex === prev.y) {
						return {
							...dungeonMap[rIndex][cIndex],
							containsCharacter: false,
						}
					} else if (cIndex === next.x && rIndex === next.y) {
						let cell = {
							...dungeonMap[rIndex][cIndex],
							containsCharacter: true,
						}
						cell = checkForWeapon(cell, cIndex, rIndex);
						
						return cell;
					}
					return col;
				});
			});
		}

		switch(direction) {
			case 'LEFT':

				if (charX-1 >= 0 && !dungeonMap[charY][charX-1].isWall) {
					newDungeonMap =rescanMap({x: charX, y: charY}, {x: charX-1, y: charY});
					return {
						...state,
						map: newDungeonMap,
					}
				}
				break;

			case 'RIGHT':
				if (charX+1 < mapWidth && !dungeonMap[charY][charX+1].isWall) {
					newDungeonMap = rescanMap({x: charX, y: charY}, {x: charX+1, y: charY});
					return {
						...state,
						map: newDungeonMap,
					}
				}
				break;

			case 'UP':
				if (charY-1 >= 0 && !dungeonMap[charY-1][charX].isWall) {
					newDungeonMap =rescanMap({x: charX, y: charY}, {x: charX, y: charY-1});
					return {
						...state,
						map: newDungeonMap,
					}
				}
				break;

			case 'DOWN':
				if (charY+1 < mapHeight && !dungeonMap[charY+1][charX].isWall) {
					newDungeonMap =rescanMap({x: charX, y: charY}, {x: charX, y: charY+1});
					return {
						...state,
						map: newDungeonMap,
					}
				}
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

export const characterReducer = (state = {}, action) => {
	switch (action.type) {
		case 'COLLECT_WEAPON': 
			return {
				...state,
				weapon: action.weapon
			};
		default:
			return state;
	}
}
