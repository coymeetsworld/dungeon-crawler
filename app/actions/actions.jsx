export const setLocation = (cellX, cellY) => {
	return {			
		type: 'SET_LOCATION',
		cellX,
		cellY
	}	
}

export const characterMove = (direction) => {
	console.log("Dir: " + direction);

	return {
		type: 'CHARACTER_MOVE',
		direction
	}
}