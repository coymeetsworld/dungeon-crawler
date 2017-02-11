export const dungeonMapReducer = (state = {}, action) => {

	let characterMove = (state, direction) => {
		let dungeonMap = state.map;
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
				//console.log("Goin Left");
				if (charX-1 >= 0) {
					//console.log(`${charX}-1 >= 0`);
					newDungeonMap = dungeonMap.map((row, rIndex) => {
						return row.map((col, cIndex) => {
							if (cIndex === charX && rIndex === charY) {
								return {
									containsCharacter: false,
									containsMonster: false
								}
							} else if (cIndex === charX-1 && rIndex === charY) {
								return {
									containsCharacter: true,
									containsMonster: false
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

			case 'RIGHT':
				if (charX+1 < dungeonMap.width) {

				}

			case 'UP':
				if (charY-1 > 0) {

				}

			case 'DOWN':
				if (charY+1 < dungeonMap.height) {
					
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