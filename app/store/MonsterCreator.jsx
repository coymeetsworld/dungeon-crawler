
//Lvl 1 and 2 monsters
export let createSlime = () => {
	return { hp: 15, str: 5, xp: 5 }
}

export let createGnome = () => {
	return { hp: 25, str: 10, xp: 10 }	
}

//Lvl 2 monsters
export let createSkeleton = () => {
	return { hp: 45, str: 25, xp: 25 }	
}

//Lvl 3 monsters
export let createImp = () => {
	return { hp: 90, str: 20, xp: 35 }	
}
export let createOrc = () => {
	return { hp: 125, str: 75, xp: 50 }	
}

// Mini bosses found on Lvl 4
export let createFireSkull = () => {
	return { hp: 200, str: 100, xp: 80 }	
}

// Final boss
export let createDragon = () => {
	return { hp: 900, str: 200, xp: 300 }	
}