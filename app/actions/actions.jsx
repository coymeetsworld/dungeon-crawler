export const setLocation = (cellX, cellY) => {
	return {			
		type: 'SET_LOCATION',
		cellX,
		cellY
	}	
}

export const characterMove = (direction) => {
	return {
		type: 'CHARACTER_MOVE',
		direction
	}
}

export const collectWeapon = (weapon) => {
	return {
		type: 'COLLECT_WEAPON',
		weapon
	}
}