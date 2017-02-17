export const characterMove = (direction) => {
	return {
		type: 'CHARACTER_MOVE',
		direction
	}
}

export const toggleGodView = () => {
	return {
		type: 'TOGGLE_GOD_VIEW',
	}
}
