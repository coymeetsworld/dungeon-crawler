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

		switch(direction) {
			case 'LEFT':
				console.log("newX: " + charX-1 + " y: " + charY + " isWall: " + dungeonMap[charX-1][charY].isWall);

				if (charX-1 >= 0 && !dungeonMap[charY][charX-1].isWall) {
					newDungeonMap = dungeonMap.map((row, rIndex) => {
						return row.map((col, cIndex) => {
							if (cIndex === charX && rIndex === charY) {
								return {
									containsCharacter: false,
									containsMonster: false,
									isWall: false
								}
							} else if (cIndex === charX-1 && rIndex === charY) {
								return {
									containsCharacter: true,
									containsMonster: false,
									isWall: false
								}
							}
							return col;
						});	
					});
					return {
						...state,
						map: newDungeonMap,
					}
				}
				break;

			case 'RIGHT':
				if (charX+1 < mapWidth && !dungeonMap[charY][charX+1].isWall) {
					newDungeonMap = dungeonMap.map((row, rIndex) => {
						return row.map((col, cIndex) => {
							if (cIndex === charX && rIndex === charY) {
								return {
									containsCharacter: false,
									containsMonster: false,
									isWall: false
								}
							} else if (cIndex === charX+1 && rIndex === charY) {
								return {
									containsCharacter: true,
									containsMonster: false,
									isWall: false
								}
							}
							return col;
						});	
					});
					return {
						...state,
						map: newDungeonMap,
					}
				}
				break;

			case 'UP':
				if (charY-1 >= 0 && !dungeonMap[charY-1][charX].isWall) {
					newDungeonMap = dungeonMap.map((row, rIndex) => {
						return row.map((col, cIndex) => {
							if (cIndex === charX && rIndex === charY) {
								return {
									containsCharacter: false,
									containsMonster: false,
									isWall: false
								}
							} else if (cIndex === charX && rIndex === charY-1) {
								return {
									containsCharacter: true,
									containsMonster: false,
									isWall: false
								}
							}
							return col;
						});	
					});
					return {
						...state,
						map: newDungeonMap,
					}
				}
				break;

			case 'DOWN':
				if (charY+1 < mapHeight && !dungeonMap[charY+1][charX].isWall) {
					newDungeonMap = dungeonMap.map((row, rIndex) => {
						return row.map((col, cIndex) => {
							if (cIndex === charX && rIndex === charY) {
								return {
									containsCharacter: false,
									containsMonster: false,
									isWall: false
								}
							} else if (cIndex === charX && rIndex === charY+1) {
								return {
									containsCharacter: true,
									containsMonster: false,
									isWall: false
								}
							}
							return col;
						});	
					});
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
		case 'SET_LOCATION': 
			console.log("Set loc called");
			return state;
		default:
			return state;
	}
}